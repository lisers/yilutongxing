AutoForm.hooks({
  'bj-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      IonKeyboard.close();
      Router.go('bj.show', {_id: result});
    }
  }
});

Template.newBj.onRendered(function () {
  	Meteor.call('myaddress', Geolocation.latLng(), function(error, result) {
   	  console.log(result);
	  Session.set('gaddress', result);  	
  	});

});


Template.newBj.helpers({
  bdLocation: function () {
    var latLng = Geolocation.latLng();
  	latLng=GPS.gcj_encrypt(latLng.lat,latLng.lng);
  	latLng=GPS.bd_encrypt(latLng.lat,latLng.lng);
    return latLng.lng + "," + latLng.lat;
  },
  gcjLocation: function () {
    var latLng = Geolocation.latLng();
  	latLng=GPS.gcj_encrypt(latLng.lat,latLng.lng);
    return latLng.lat + "," + latLng.lng;
  },
  gaddress: function() { return Session.get('gaddress'); }
});


