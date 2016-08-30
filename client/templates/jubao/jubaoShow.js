Template.jubaoShow.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('jubao', Router.current().params._id);
  }.bind(this));
};

Template.jubaoShow.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.jubaoShow.helpers({
  
  jubao: function () {
    return Jubao.find({}, {sort: {createdAt:-1,numberOfVotes: -1}});
  }
});

/*Template.jubaoShow.events({
  'click [data-action=new-comment]': function (event, template) {
    if (Meteor.user()) {
      IonModal.open('newComment', {productId: this._id});
    } else {
      IonModal.open('signIn');
    }
  }
});
*/