Template.profile.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('user', Meteor.userId());
  }.bind(this));
};

Template.profile.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));

  console.log('用户状态：');
  console.log(!Meteor.loggingIn());
  console.log(!Meteor.user());
  if (!Meteor.loggingIn() && !Meteor.user()) {
	console.log('signIn');
    IonModal.open('signIn');
  }
};

Template.profile.helpers({
  user: function () {
    if (Meteor.userId()) {
      return Meteor.user();
    }
  }
});
