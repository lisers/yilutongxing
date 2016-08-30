Template.mapgj.created = function () {
  this.autorun(function () {

  }.bind(this));
};

var markers = {};
var mapLabels={};

  
Template.mapgj.helpers({
		mapOptions: function() {
		
			//var latLng = Geolocation.latLng();
			//var latLng = GPS.gcj_encrypt(28.327001,112.942752);
			var latLng = GPS.gcj_encrypt(28.330562,112.92148);
			
			if (GoogleMaps.loaded() && latLng) {
		    // console.log(latLng);
			   latLng=GPS.gcj_encrypt(latLng.lat,latLng.lng);

				return {
				  center: new google.maps.LatLng(latLng.lat, latLng.lng),
				  streetViewControl:false,
				  zoom: 15
				};
			}
		}
  });
  
Template.mapgj.rendered = function(){
	$('a[href$=apiv3]').empty();
};


Template.appLayout.events({
	'click [data-action=other-gj]': function (event, template) {
    	IonActionSheet.show({
      		titleText: '行驶轨迹',
      buttons: [
        { text: '<i class="icon ion-ios-reverse-camera"></i> 实时跟踪' },
        { text: '<i class="icon ion-ios-americanfootball"></i> 今日路线' },
        { text: '<i class="icon ion-ios-camera"></i> 昨天路线' }
      ],
      cancelText: '返回',
      
      buttonClicked: function(index) {
      
        if (!Meteor.user()) {
		 index=-1;
         IonModal.open('signIn');
        }

        if (index === 0) {
          console.log('实时路况');
          MeteorCamera.getPicture(function (error, data) {
	        // we have a picture
    	    if (! error) {
        	  lkonSuccess(data);
        	}
	      });
        }
        
        if (index === 1) {
          console.log('事故报警!');
          IonModal.open('newBj');
        }
        
        return true;
      }
    });
  }  
});  

Template.mapgj.onCreated(function() {    
	
    var self = this;
    GoogleMaps.ready('map', function(map) {
        var directionsService = new google.maps.DirectionsService();
        var directionDisplay;
        var path = null,timer = 0,index = 0,marker = null;
		
		
		
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

		var stylez = [
		  {
			featureType: "all",
			stylers: [
			  { hue: "#0000ff" },
			  { saturation: -75 }
			]
		  },
		  {
			featureType: "poi",
			elementType: "label",
			stylers: [
			  { visibility: "off" }
			]
		  }
		];
		styledMapType = new google.maps.StyledMapType(stylez, {name: "Edited"});

		//$('a[href$=apiv3]').empty();
		

//bounds  = new google.maps.LatLngBounds();
				
		var currentdate = moment().format('YYYY-MM-DD');
		console.log(currentdate);
		
		Meteor.call('getgpsline', Router.current().params.imei, currentdate,  function(error, result) {
   		    //console.log(result);
		    var flightPlanCoordinates = new Array();
		    for(var i=0;i<result.length;i++){
			    //console.log(result[i]);
			    flightPlanCoordinates.push(new google.maps.LatLng(result[i][0],result[i][1]));
		    }
			
			if(flightPlanCoordinates.length > 0)
			{
				var flightPath = new google.maps.Polyline({  
					path: flightPlanCoordinates,  
					strokeColor: "#0000ff",  
					strokeOpacity: 1.0,  
					strokeWeight: 5  
				});  
				flightPath.setMap(map.instance); // 如果想还原去掉折线用：flightMap.setMap(null)
			}
	  	});
		
		/*
		var flightPlanCoordinates1 = [  
		    new google.maps.LatLng(28.329693,112.928993), 
			new google.maps.LatLng(28.328693,112.928393),  
			new google.maps.LatLng(28.328099,112.928517),  
			new google.maps.LatLng(28.328693,112.928393)  
		];  
		
		var flightPath = new google.maps.Polyline({  
			   path: flightPlanCoordinates1,  
			   strokeColor: "#0000ff",  
			   strokeOpacity: 1.0,  
			   strokeWeight: 6  
		});  
		flightPath.setMap(map.instance); // 如果想还原去掉折线用：flightMap.setMap(null)
        */	

    });
  	
});