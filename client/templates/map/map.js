var markers = {};
var bounds;
var infowindows = new Array();

var metepush=0;
  
Template.map.helpers({
    mapOptions: function() {

	var latLng  = {lat: 28.2111356439561, lng: 112.9855350929447};

        
    if (GoogleMaps.loaded() && latLng) {
 
  	  latLng=GPS.gcj_encrypt(latLng.lat,latLng.lng);

        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),

/*          
          mapTypeControl: true,

	      mapTypeControlOptions: {
    	    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        	position: google.maps.ControlPosition.TOP_CENTER
	      },
	      zoomControl: true,
	      zoomControlOptions: {
	        position: google.maps.ControlPosition.LEFT_CENTER
	      },

	      scaleControl: true,
	      streetViewControlOptions: {
	        position: google.maps.ControlPosition.LEFT_TOP
	      },
 */ 
 	      streetViewControl: false,

          zoom: 15
        };
      }
    }
});

function CenterControl(controlDiv, map, center) {
  // We set up a variable for this since we're adding event listeners later.
  var control = this;

  // Set the center property upon construction
  control.center_ = center;
  controlDiv.style.clear = 'both';
  
  

  // Set CSS for the control border
  var goCenterUI = document.createElement('div');
  goCenterUI.id = 'goCenterUI';
  goCenterUI.title = 'Click to recenter the map';
  goCenterUI.style['background'] = "url('/icon/wsj.png') no-repeat 0 0" ;

  controlDiv.appendChild(goCenterUI);

  // Set CSS for the control interior
  var goCenterText = document.createElement('div');
  goCenterText.id = 'goCenterText';
  goCenterText.innerHTML = '';
  goCenterUI.appendChild(goCenterText);
  
  

  // Set CSS for the setCenter control border
  var setCenterUI = document.createElement('div');
  setCenterUI.id = 'setCenterUI';
  setCenterUI.title = 'Click to change the center of the map';
  setCenterUI.style['background'] = "url('/icon/24h.png') no-repeat 0 0" ;
  controlDiv.appendChild(setCenterUI);

  // Set CSS for the control interior
  var setCenterText = document.createElement('div');
  setCenterText.id = 'setCenterText';
  setCenterText.innerHTML = '';
  setCenterUI.appendChild(setCenterText);
  
  

  // Set up the click event listener for 'Center Map': Set the center of the map
  // to the current center of the control.
  goCenterUI.addEventListener('click', function() {
    //var currentCenter = control.getCenter();
    //map.setCenter(currentCenter);
    map.fitBounds(bounds);       //auto-zoom
	map.panToBounds(bounds);     //auto-center

  });

  // Set up the click event listener for 'Set Center': Set the center of the
  // control to the current center of the map.
  setCenterUI.addEventListener('click', function() {
    var newCenter = map.getCenter();
    control.setCenter(newCenter);
  });
}

/**
 * Define a property to hold the center state.
 * @private
 */
CenterControl.prototype.center_ = null;

/**
 * Gets the map center.
 * @return {?google.maps.LatLng}
 */
CenterControl.prototype.getCenter = function() {
  return this.center_;
};

/**
 * Sets the map center.
 * @param {?google.maps.LatLng} center
 */
CenterControl.prototype.setCenter = function(center) {
  this.center_ = center;
};

Template.map.onCreated(function() {    

  Meteor.subscribe('vehsmap');

  var self = this;
  
  GoogleMaps.ready('map', function(map) {
	$('a[href$=apiv3]').empty();
  
    var marker; 
    var mymarker;   
    var vehmarker;
	var image = {
   		url: "images/mylocation.gif",
   		size: new google.maps.Size(100, 100),
   		origin: new google.maps.Point(0,0),
   		anchor: new google.maps.Point(50, 50),
   		scaledSize: new google.maps.Size(100, 100)
  	};
  	
  	bounds  = new google.maps.LatLngBounds();

  	
    var styles = [
/*    
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },
*/
		{
    		"featureType": "poi.business",
    		"stylers": [
      			{ "visibility": "off" }
    		]
		},
		{
    		"featureType": "poi.medical",
    		"stylers": [
      			{ "visibility": "off" }
    		]
  		},
  		{
    		"featureType": "transit.station",
    		"stylers": [
      			{ "visibility": "off" }
    		]
  		}
	];

	map.instance.setOptions({styles: styles});


  // Create the DIV to hold the control and call the CenterControl() constructor
  // passing in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map.instance);

  centerControlDiv.index = 1;
  centerControlDiv.style['padding-top'] = '10px';
  map.instance.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);  

           
	metepush = Veh.find().observe({
    	added: function (document) {
//		 console.log(document);

    	 if (document.lat) {    

          var d3= gettimediff(document.active);
  		  var mm ='/veh/' + parseInt((document.fx)/10)*10;
		  if (d3>2) mm = '/veh/stop';
		  mm = mm  + '.png';

		  var image = {
   			url: mm,
   			size: new google.maps.Size(24,24),
   			origin: new google.maps.Point(0,0),
   			anchor: new google.maps.Point(12, 12),
   			scaledSize: new google.maps.Size(24, 24)
	  	  };
			var labtext="";

			if (document.hphm) {
		  		labtext=document.hphm;
			}else {
		  		labtext=document.imei;
			}

        	var latLng=GPS.gcj_encrypt(document.lat,document.lng);

			var contentString = '<div style="color:black;text-align:left;">' +document.hphm+'<br />' +document.dw+
			'<br />imei='+ document.imei +
			'<br /><br />'+
			'<button data-id="' + document.imei + '" class="button button-clear pull-left button-positive" data-ion-modal="csjl">超速记录</button><br />' +
			'<a href="#" modal="ssgz"  data-id="' + document.imei + '" class="button button-clear pull-left button-positive">历史轨迹</a><br />' +
			'</div>';  
          
        	var infowindow = new google.maps.InfoWindow({  
            	content: contentString  
       		 });  

			loc = new google.maps.LatLng(latLng.lat, latLng.lng);

/*        
     		var vehmarker = new MarkerWithLabel({
                 icon: image, 
                 position: latLng,
//                 draggable: true,
                 raiseOnDrag: true,
                 map: map.instance,
                 labelContent: labtext,
                 labelAnchor: new google.maps.Point(-10, 30),
                 labelClass: "labels", // the CSS class for the label
                 labelStyle: {opacity: 0.75}
            });
*/            
	        var vehmarker = new google.maps.Marker({
            	icon: image,
            	position: loc,
            	map: map.instance,
            	title:labtext,
            	id: document._id
            });            

			bounds.extend(loc);

	        google.maps.event.addListener(vehmarker, 'click', function() { 
	            for (var i = 0; i < infowindows.length; i++) {
          			infowindows[i].close();
        		}
	        	infowindows.push(infowindow);
    	        infowindow.open(map.instance, vehmarker);  
        	}); 
        	        
         	google.maps.event.addListener(vehmarker, 'dragend', function(event) {
//            	Veh.update(vehmarker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
         	});
         	
	        markers[document._id] = vehmarker;
	        
 		  }
        },
        
        changed: function (newDocument, oldDocument) {
//         console.log(newDocument);
	     if (newDocument.lat) {    
          
          var d3= gettimediff(newDocument.active);
          var latLng=GPS.gcj_encrypt(newDocument.lat,newDocument.lng);
		  
   		  var mm ='/veh/' + parseInt((newDocument.fx)/10)*10;
		  if (d3>2) mm = '/veh/stop';
		  mm = mm  + '.png';
		  
		  var image = {
   			url: mm,
   			size: new google.maps.Size(24, 24),
   			origin: new google.maps.Point(0,0),
   			anchor: new google.maps.Point(12, 12),
   			scaledSize: new google.maps.Size(24, 24)
  		  };
         
          markers[newDocument._id].setIcon(image);
          markers[newDocument._id].setPosition({ lat: latLng.lat, lng: latLng.lng });

		  loc = new google.maps.LatLng(latLng.lat, latLng.lng);
		  bounds.extend(loc);

		 }
        },
        
        removed: function (oldDocument) {
          markers[oldDocument._id].setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];

        }
    });
 


    // Create and move the marker when latLng changes.
    var task = self.autorun(function() {
      var latLng = Geolocation.latLng();
      
      if (! latLng)
        return;
	  console.log("showCurrLocationMarker");
	  console.log(latLng);
	  $('a[href$=apiv3]').empty();

 	  latLng=GPS.gcj_encrypt(latLng.lat,latLng.lng);
 	  
      // If the marker doesn't yet exist, create it.
      if (! mymarker) {
        mymarker = new RichMarker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
	      content: '<div id="Tracer"><div class="ring"></div><div class="ring"></div></div>',
          map: map.instance
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        mymarker.setPosition(new google.maps.LatLng(latLng.lat, latLng.lng));  
      }

      // Center and zoom the map view onto the current position.
//      map.instance.setCenter(mymarker.getPosition());
//      map.instance.setZoom(MAP_ZOOM);
    });
  });
});

Template.map.onDestroyed(function () {

    console.log("退出地图");

	metepush.stop();

});

function gettimediff(old) {
	var d1 = new Date(old.replace(/\-/g, "\/"));  
	var d2 = new Date();  
	return  (d2-d1)/(1000*60);
}
