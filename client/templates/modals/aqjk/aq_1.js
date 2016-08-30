Template.aq_1.created = function () {
  this.autorun(function () {
  this.subscription = Meteor.subscribe('aqjk');
  Session.set('id', this.data);  
  }.bind(this));
};

Template.aq_1.helpers({
  veh: function () {
  var mo= Aqjk.findOne({_id: Session.get('id')});
   console.log('mo：');
   console.log(mo);
   return mo;
  },
  exampleDoc: function () {
   var mo= Aqjk.findOne();
   console.log(mo);
   return mo;
  }
});


Template.aq_1.events({
  'click [data-action=up]': function (event, template) {
    IonModal.close();
    IonKeyboard.close();
  },
  'click [data-action=save]': function (event, template) {
  
    event.preventDefault();

    var post_aqjk = {
      xm: $("#xm").val(),
      xb: $("#xb").val(),
      csny: $("#csny").val(),
      xx: $("#xx").val(),
      sx_1: $("#sx_1").val(),
      sx_2: $("#sx_2").val(),
      fx_1: $("#fx_1").val(),
      fx_2: $("#fx_2").val(),
      cf_dd: $("#cf_dd").val(),
      dd_dd: $("#dd_dd").val(),
      gl: $("#gl").val(),
      sx_wxdd: $("#sx_wxdd").val()
  };
     console.log('post_aqjk:');
     console.log(post_aqjk);
   Aqjk.insert( post_aqjk, function(error,result) {
      if (error) {
        console.log(error);
      } else {
        console.log('插入完成');
        IonModal.close();
        var id = result;
        console.log(result);
        Session.set('id', id);
        IonModal.open('aq_2', id);
      }
    });
  
  }
  
});
