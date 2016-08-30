Template.bjlist.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('bjs');
  }.bind(this));
};

Template.bjlist.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.bjlist.helpers({
  products: function () {
    return Bjs.find({}, {sort: {createdAt: -1, name: -1}});
  }
});
