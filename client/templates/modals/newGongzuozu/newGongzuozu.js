/*
AutoForm.hooks({
  'gongzuozu-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      IonKeyboard.close();
	  console.log('保存成功');
      //Router.go('products.show', {_id: result});
    }
  }
});
*/

AutoForm.hooks({
  'gongzuozu-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      IonKeyboard.close();
	  console.log('gongzuozu-new-form');
      //Router.go('products.show', {_id: result});
    }
  }
});

Template.newGongzuozu.onRendered(function () {
	
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
  
  	Meteor.call('myaddress', Geolocation.latLng(), function(error, result) {
   	  console.log(result);
	  Session.set('gaddress', result);  	
  	});
  
  console.log('用户状态：');
  console.log(!Meteor.loggingIn());
  console.log(!Meteor.user());
  
  if (!Meteor.loggingIn() && !Meteor.user()) {
	console.log('signIn');
    IonModal.open('signIn');
	//Router.go("/trending");
  }

  
});


Template.newGongzuozu.helpers({
  bdLocation: function () {
    var latLng = Geolocation.latLng();

  	latLng=GPS.gcj_encrypt(latLng.lat,latLng.lng);

  	latLng=GPS.bd_encrypt(latLng.lat,latLng.lng);

    return latLng.lng + "," + latLng.lat;
  },
  gaddress: function() { return Session.get('gaddress'); }
});


