
Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



Template.gps.created = function () {
  this.autorun(function () {
     this.subscription = Meteor.subscribe('gps');
     Session.set('id', this.data);  
     console.log(this.data); 
  }.bind(this));
};

Template.gps.helpers({
  veh: function () {
  var mo= Gps.findOne({_id: Session.get('id')});
   console.log('Gps mo：');
   console.log(mo);
   return mo;
  },
  exampleDoc: function () {
   var mo= Gps.findOne();
   console.log(mo);
   return mo;
  }
});


Template.gps.events({
  'click [data-action=up]': function (event, template) {
    IonModal.close();
    IonKeyboard.close();
  },
  'click [data-action=save]': function (event, template) {
    //var rksj = new Date();
	var rksj= new Date().format("yyyy-MM-dd hh:mm:ss");
	
    event.preventDefault();
    var latLng = GPS.gcj_encrypt(28.330562,112.92148);
 //    var latLng = Geolocation.latLng();
 //    if (! latLng) {
	// 	alert('没有获取到经纬度！');
 //        return;
 //    }
	// console.log('经纬度：' + latLng);
	
    var post_gps = {
      mc: $("#mc").val(),
      lx: $("#lx").val(),
      time:$("#time").val(),
      // marker: [{
      //        lat: latLng.lat,
      //        lng: latLng.lng,
      //         }]
      gps:[{
        marker : {
        lat: latLng.lat,
        lng: latLng.lng,
        },
        rksj : rksj
      }]
    };

  

   // 插入
    console.log('post_gps：');
    console.log(post_gps);
    Gps.insert( post_gps, function(error,result) {
      if (error) {
        console.log('error:' + error);
      } else {
        console.log('插入完成');
        IonModal.close();
        var id = result;
        console.log('跳转gps_lb:' + result);
        Session.set('id', id);
        IonModal.open('gps_lb', id);
      }
    });
	
  }
  
});

