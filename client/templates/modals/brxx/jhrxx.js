
Template.jh.created = function () {
  this.autorun(function () {
	this.subscription = Meteor.subscribe('brxx');
	Session.set('id', this.data);  
    console.log('created：' + Session.get('id'));	
  }.bind(this));
};

Template.jh.helpers({
  veh: function () {
	var mo= Brxx.findOne({_id: Session.get('id')});
	 console.log('jhrxx mo：');
	 console.log(mo);
	 return mo;
  },
  exampleDoc: function () {
	 var mo= Brxx.findOne();
     //console.log(mo);
	 return mo;
  }
});


Template.jh.events({
  'click [data-action=up]': function (event, template) {
    if (Meteor.user()) {
		IonModal.close();
		var id = Session.get('id');
		console.log('跳转jz:' + id);
        IonModal.open('jz', id);
    } else {
      IonModal.open('signIn');
    }
  },
  
  'click [data-action=save]': function (event, template) {
  
    event.preventDefault();
    console.log('id：' + Session.get('id'));
    var currentPostId = Session.get('id');

    var postProperties = {
      fmwc: $("#fmwc").val(),
      s_fmwc: $("#s_fmwc").val(),
      wjhnl: $("#wjhnl").val(),
      qtjhr: $("#qtjhr").val(),
      jhlx: $("#jhlx").val(),
      gx: $("#gx").val(),
      jhr_xm: $("#jhr_xm").val(),
      jhr_tel: $("#jhr_tel").val(),
      jhr_sfz: $("#jhr_sfz").val(),
      jhr_jzdz: $("#jhr_jzdz").val()
    };
	
    //alert($("#xmf").val());
	console.log('Brxx.update：' + currentPostId);
	
    Brxx.update(currentPostId, {$set: postProperties}, function(error,result) {
      if (error) {
        // 向用户显示错误信息
        console.log('error:' + error);
      } else {
		   //alert(Session.get('id'));
        IonModal.close();
		var id = Session.get('id');
		console.log('跳转jt:' + id);
        IonModal.open('jt', id);
      }
    });
  }
  
});
