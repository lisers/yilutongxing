
Template.jt_update.created = function () {
  this.autorun(function () {
	this.subscription = Meteor.subscribe('brxx');
	Session.set('id', this.data);  
    console.log('created：' + Session.get('id'));	
  }.bind(this));

};

Template.jt_update.helpers({
  veh: function () {
	var mo= Brxx.findOne({_id: Session.get('id')});
	 console.log('jtjbqk mo：');
	 console.log(mo);
	 return mo;
  },
  exampleDoc: function () {
	 var mo= Brxx.findOne();
     //console.log(mo);
	 return mo;
  }
});


Template.jt_update.events({
  'click [data-action=up]': function (event, template) {
    if (Meteor.user()) {
		IonModal.close();
		var id = Session.get('id');
		console.log('跳转jh_update:' + id);
        IonModal.open('jh_update', id);
    } else {
      IonModal.open('signIn');
    }
  },
  
  'click [data-action=save]': function (event, template) {
    event.preventDefault();
    console.log('id：' + Session.get('id'));
    var currentPostId = Session.get('id');
	
	 var arr = new Array();
	 var arr2 = new Array();
	 
	 var i = 0;
	 $("input[name='jjly']:checked").each(function () {
          console.log(this.value);
		  arr[i] = this.value;
		  i = i + 1;
     });
		
     i = 0;		
	 $("input[name='bfqk']:checked").each(function () {
          console.log(this.value);
		  arr2[i] = this.value;
		  i = i + 1;
     });
	
     var postProperties = {
       jjly: arr ,
       bfqk: arr2
     };
	
    /*		
    var postProperties = {
       jjly:[ $("#jjly1").val(),$("#jjly2").val(),$("#jjly3").val(),$("#jjly4").val(),$("#jjly5").val()] ,
       bfqk:[ $("#bfqk1").val(),$("#bfqk2").val(),$("#bfqk3").val(),$("#bfqk4").val(),$("#bfqk5").val()]
    };
	*/
	
	console.log(postProperties);
	
    Brxx.update(currentPostId, {$set: postProperties}, function(error,result) {
      if (error) {
         // 向用户显示错误信息
		 console.log('error:' + error);
      } else {
		  console.log('保存成功！');
          IonModal.close();
      }

    });
  }
  
  
});
