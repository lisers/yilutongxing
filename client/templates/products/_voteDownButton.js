Template._voteDownButton.events({
  'click': function (event, template) {
    event.preventDefault();

    if (!Meteor.user()) {
      IonModal.open('signIn');
      return;
    }

	console.log('Products.voteDown');
	console.log(this._id);
    Meteor.call('Products.voteDown', this._id);
  }
});

Template._voteDownButton.helpers({
  hasVotedClass: function () {
    if (!Meteor.user()) {
      return;
    }
    if(_(Meteor.user().profile.votedProductIds).contains(this._id)) {
      return 'has-voted';
    }
  }
});
