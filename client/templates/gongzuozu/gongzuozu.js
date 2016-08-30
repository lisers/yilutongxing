/*
Template.gongzuozu.rendered = function () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signIn');
  }
};
*/

Template.gongzuozu.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('gongzuozu');
  }.bind(this));
};

Template.gongzuozu.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
  
};

Template.gongzuozu.helpers({
  gongzuozu: function () {
    return Gongzuozu.find({}, {sort: {createdAt:-1,numberOfVotes: -1}});
  }
});

