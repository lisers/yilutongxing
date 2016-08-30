Template.xxlb.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('brxx');
  }.bind(this));
};

Template.xxlb.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.xxlb.helpers({
  xxlb: function () {
    //var mo = Brxx.find({/*_id: Session.get('id')*/}, {sort: {/*createdAt: -1,*/ name: 1}});
	var mo = Brxx.find({}, {sort: {createdAt: -1, xm: -1}});
    console.log(mo);
    return mo;
  }
});

Template.xxlb.events({
  'click [data-action=fh]': function (event, template) {
      Router.go("/profile");
  }
  // 'click [data-action=xg]': function (event, template) {
  //    if (Meteor.user()) { 
  //     IonModal.close();
  //     IonKeyboard.close();
  //     console.log('跳转br:' + id);
  //     IonModal.open('br_update', id);
  //     } else {
  //     IonModal.open('signIn');
  //   }
  // }
});