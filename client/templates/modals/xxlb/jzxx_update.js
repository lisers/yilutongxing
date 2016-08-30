
Template.jz_update.created = function () {
  this.autorun(function () {
	this.subscription = Meteor.subscribe('brxx');
	Session.set('id', this.data);    
  }.bind(this));
};

Template.jz_update.helpers({
  veh: function () {
	var mo= Brxx.findOne({_id: Session.get('id')});
	 console.log('jzxx mo：');
	 console.log(mo);
	 return mo;
  },
  exampleDoc: function () {
	 var mo= Brxx.findOne();
     //console.log(mo);
	 return mo;
  }
});


Template.jz_update.events({
  'click [data-action=up]': function (event, template) {
    if (Meteor.user()) {
		IonModal.close();
		var id = Session.get('id');
		console.log('跳转br_update:' + id);
        IonModal.open('br_update', id);
    } else {
        IonModal.open('signIn');
    }
  },
  
  'click [data-action=save]': function (event, template) {
    event.preventDefault();
    console.log('id：' + Session.get('id'));
    var currentPostId = Session.get('id');
	
	//xmf nlf qqf wxf telf wcsjf wcxxdzf xmm nlm qqm wxm telm wcsjm wcxxdzm
    var postProperties = {
      zf_xm: $("#zf_xm").val(),
      zf_csny: $("#zf_csny").val(),
      zm_xm: $("#zm_xm").val(),
      zm_csny: $("#zm_csny").val(),
      wzf_xm: $("#wzf_xm").val(),
      wzf_csny: $("#wzf_csny").val(),
      wzm_xm: $("#wzm_xm").val(),
      wzm_csny: $("#wzm_csny").val(),
      fq_xm: $("#fq_xm").val(),
      fq_csny: $("#fq_csny").val(),
      fq_tel: $("#fq_tel").val(),
      fq_sfz: $("#fq_sfz").val(),
      fq_wgdd: $("#fq_wgdd").val(),
      mq_xm: $("#mq_xm").val(),
      mq_csny: $("#mq_csny").val(),
      mq_tel: $("#mq_tel").val(),
      mq_sfz: $("#mq_sfz").val(),
      mq_wgdd: $("#mq_wgdd").val()

    };
	
    console.log(currentPostId);
    console.log(postProperties);
	
    Brxx.update(currentPostId, {$set: postProperties}, function(error,result) {
      if (error) {
        // 向用户显示错误信息
		console.log('error:' + error);
        //alert(error);
      } else {
        //IonModal.open('jh', {id: Session.get('id')});
        IonModal.close();
		var id = Session.get('id');
		console.log('跳转jh_update:' + id);
        IonModal.open('jh_update', id);
      }
      
    });
  }
  
});