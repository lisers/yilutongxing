Template.settings.events({
  'click [data-action=sign-out]': function (event, template) {
    Meteor.logout(function () {
      IonModal.close();
      Router.go('/map');
    });
  }
});

Template.settings.helpers({
  usersetting: function() {
    return Meteor.user();
  },
  allowjtinfo: function(){
    return Meteor.user().profile.jtinfo;
  }
});