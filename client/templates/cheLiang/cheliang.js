/*
Template.cheliang.rendered = function () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signIn');
  }
};
*/

Template.cheliang.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('cheliang');
  }.bind(this));
};

Template.cheliang.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
  
};

Template.cheliang.helpers({
  cheliang: function () {
    return Cheliang.find({}, {sort: {createdAt:-1,numberOfVotes: -1}});
  }
    
});

