Meteor.methods({
  myaddress: function(loc) {
   var place="";
   console.log(loc);

    if (! this.isSimulation && loc)
	   place = getLocationPlace(loc);
   return place;
  }
});

if (Meteor.isServer) {

   getLocationPlace = function(loc) {

  	var latLng=GPS.gcj_encrypt(loc.lat,loc.lng);

	var url= 'http://maps.google.cn/maps/api/geocode/json?'
		+ 'latlng=' + latLng.lat + ',' + latLng.lng
		+ '&language=zh-CN';

	console.log(url);
    
	var response = HTTP.get(url);

    if (response.statusCode === 200 && response.data) {
	 //alert(response.statusCode);
		var place=response.data.results[0].formatted_address;	 
	 console.log(place);
        return place;
    }
  }

}
