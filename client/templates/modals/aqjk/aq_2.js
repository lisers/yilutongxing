
Template.aq_2.created = function () {
  this.autorun(function () {
	this.subscription = Meteor.subscribe('aqjk');
  console.log('this.data:');
  console.log(this.data);

	Session.set('id', this.data);    
  }.bind(this));
};

Template.aq_2.helpers({
  veh: function () {
    //console.log(Session.get('id'));
	var mo= Aqjk.findOne({_id: Session.get('id')});
	 //console.log('mo：');
	 //console.log(mo);
	 return mo;
  },
  exampleDoc: function () {
	 var mo= Aqjk.findOne();
	 return mo;
  }
});


Template.aq_2.events({
  'click [data-action=up]': function (event, template) {
    if (Meteor.user()) {
      IonModal.open('aq_1', {id: this.data});
    } else {
      IonModal.open('signIn');
    }
  },
  
  'click [data-action=save]': function (event, template) {
    event.preventDefault();
    console.log('save - Session：');
    console.log(Session.get('id'));
    var currentPostId = Session.get('id');
    var postProperties = {
      zm_1: $("#zm_1").val(),
      dd_1: $("#dd_1").val(),
      zm_2: $("#zm_2").val(),
      dd_2: $("#dd_2").val(),
      zm_3: $("#zm_3").val(),
      dd_3: $("#dd_3").val(),
      zm_wxdd: $("#zm_wxdd").val()

    };
    console.log(currentPostId);
    console.log(postProperties);
    Aqjk.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        alert(error);
      } else {
        IonModal.close();
        IonModal.open('aq_3',Session.get('id'));
      }
      
    });
  }
  
});