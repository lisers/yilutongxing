Template.cheLiangXQ.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('cheliang', Router.current().params._id);
	//this.subscription = Meteor.subscribe('product', Router.current().params._id);
  }.bind(this));
};

Template.cheLiangXQ.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.cheLiangXQ.helpers({
    photos: function () {
		//return Cheliang.findOne({_id: Router.current().params._id});
		
		var clid = Router.current().params._id;
		console.log(clid);
		
		clid = "\"" + Router.current().params._id + "\""
		console.log(clid);
		
		//var hphm = Cheliang.findOne().hphm;
		//console.log(hphm);
		
		//var sum = Cheliang.find().count();
		//console.log(sum);
		  
		//sum = Cheliang.findOne({_id: Router.current().params._id}).count();
		//console.log(sum);
	  
		//var mo= Cheliang.findOne({_id: "" + Router.current().params._id + "" });
		var mo= Cheliang.findOne({_id: Router.current().params._id});
		console.log(mo.hphm);
		console.log(mo.clPhoto);
		return mo.clPhoto;
    }
});

Template.cheLiangXQ.events({
  'click [data-action=new-comment]': function (event, template) {
    if (Meteor.user()) {
      IonModal.open('newComment', {productId: this._id});
    } else {
      IonModal.open('signIn');
    }
  }
});
