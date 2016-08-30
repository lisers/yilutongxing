AutoForm.hooks({
  'jubao-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      IonKeyboard.close();
	   console.log('jubao-new-form');
      Router.go('jubao.show', {_id: result});
    }
  }
});

Template.ju.onRendered(function () {
  	Meteor.call('myaddress', Geolocation.latLng(), function(error, result) {
   	  console.log(result);
	  Session.set('gaddress', result);  	
  	});

});


Template.ju.helpers({
  bdLocation: function () {
    var latLng = Geolocation.latLng();

  	latLng=GPS.gcj_encrypt(latLng.lat,latLng.lng);

  	latLng=GPS.bd_encrypt(latLng.lat,latLng.lng);

    return latLng.lng + "," + latLng.lat;
  },
  gaddress: function() { return Session.get('gaddress'); }
});


