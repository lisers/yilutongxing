AutoForm.hooks({
  'products-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      IonKeyboard.close();
	  console.log('products-new-form');
      Router.go('products.show', {_id: result});
    }
  }
});

Template.newProduct.onRendered(function () {
  	Meteor.call('myaddress', Geolocation.latLng(), function(error, result) {
   	  console.log(result);
	  Session.set('gaddress', result);  	
  	});

});


Template.newProduct.helpers({
  bdLocation: function () {
    var latLng = Geolocation.latLng();

  	latLng=GPS.gcj_encrypt(latLng.lat,latLng.lng);

  	latLng=GPS.bd_encrypt(latLng.lat,latLng.lng);

    return latLng.lng + "," + latLng.lat;
  },
  gaddress: function() { return Session.get('gaddress'); }
});


