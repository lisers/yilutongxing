Template.jubaoXQ.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('jubao', Router.current().params._id);
	//this.subscription = Meteor.subscribe('product', Router.current().params._id);
  }.bind(this));
};

Template.jubaoXQ.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.jubaoXQ.helpers({
    photos: function () {

		var clid = Router.current().params._id;
		console.log(clid);
		
		//clid = "\"" + Router.current().params._id + "\""
		//console.log(clid);
		
		//var hphm = Cheliang.findOne().hphm;
		//console.log(hphm);
		
		//var sum = Cheliang.find().count();
		//console.log(sum);
		  
		//sum = Cheliang.findOne({_id: Router.current().params._id}).count();
		//console.log(sum);
	  
		//var mo= Cheliang.findOne({_id: "" + Router.current().params._id + "" });
		var mo= Jubao.findOne({_id: Router.current().params._id});
		console.log(mo);
		//console.log(mo.hphm);
		//console.log(mo.clPhoto);
		//return mo.clPhoto;
		return mo;
    }
	
});

Template.jubaoXQ.events({
  'click [data-action=new-comment]': function (event, template) {
    if (Meteor.user()) {
      IonModal.open('newComment', {productId: this._id});
    } else {
      IonModal.open('signIn');
    }
  }
});
