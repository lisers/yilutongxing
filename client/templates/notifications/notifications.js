/*
Template.notifications.rendered = function () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signIn');
  }
};
*/

Template.notifications.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('notifications');
  }.bind(this));
};

Template.notifications.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
  
};

Template.notifications.helpers({
  notifications: function () {
    return Notifications.find({}, {sort: {createdAt:-1,numberOfVotes: -1, name: -1}});
  }
});

