
Template.aq_3.created = function () {
  this.autorun(function () {
	this.subscription = Meteor.subscribe('aqjk');
   //console.log('this.data:');
  //console.log(this.data);
	Session.set('id', this.data);    
  }.bind(this));
};

Template.aq_3.helpers({
  veh: function () {
    //console.log(Session.get('id'));
	var mo= Aqjk.findOne({_id: Session.get('id')});
	 console.log('mo：');
	 console.log(mo);
	 return mo;
  },
  exampleDoc: function () {
	 var mo= Aqjk.findOne();
     //console.log(mo);
	 return mo;
  }
});


Template.aq_3.events({
  'click [data-action=up]': function (event, template) {
    if (Meteor.user()) {
      IonModal.open('aq_2', {id: this.data});
    } else {
      IonModal.open('signIn');
    }
  },
  
  'click [data-action=save]': function (event, template) {
    event.preventDefault();
    
    var currentPostId = Session.get('id');
    var postProperties = {
      hj_jzdd: $("#hj_jzdd").val(),
      hj_cqdd: $("#hj_cqdd").val(),
      hj_wxdd: $("#hj_wxdd").val(),
      sj_jzdd: $("#sj_jzdd").val(),
      sj_cqdd: $("#sj_cqdd").val(),
      sj_wxdd: $("#sj_wxdd").val()
    };
	
    console.log('save - aq_3：');
    console.log(currentPostId);

    Aqjk.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // 向用户显示错误信息
        alert(error);
      } else {
        IonModal.close();
      }
      
    });
  }
  
});