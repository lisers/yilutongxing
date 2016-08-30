Template._votencButton.events({
  'click': function (event, template) {
    event.preventDefault();

    if (!Meteor.user()) {
      IonModal.open('signIn');
      return;
    }
   
    console.log('Notifications.vote');
	console.log(this._id);
    Meteor.call('Notifications.vote', this._id);
  }
});

Template._votencButton.helpers({
  hasVotedClass: function () {
    if (!Meteor.user()) {
      return;
    }
    if(_(Meteor.user().profile.votedProductIds).contains(this._id)) {
      return 'has-voted';
    }
  }
});
