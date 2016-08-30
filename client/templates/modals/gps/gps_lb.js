
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

Template.gps_lb.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('gps');
    Session.set('id', this.data);  
    console.log(this.data); 
  }.bind(this));
};



Template.gps_lb.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.gps_lb.helpers({
  gpslb: function () {                //gpslb: {{#each gpslb}} 不能与模板页<template name="gps_lb">相同
    var id = Session.get('id');
	  //var mo = Gps.find({}, {sort: {createdAt: -1, xm: -1}});
    var mo = Gps.findOne({_id:id}, {sort: {rksj: 1}}); 
    //Gps.find({},{}) 应在server中的publications.js打开查找权限
    //Meteor.publish('gps', function() {return Gps.find();});
    console.log('mo.gps：');
    console.log(mo.gps);
    return mo.gps;
  }
});

Template.gps_lb.events({
  'click [data-action=bj]': function (event, template) {
    event.preventDefault();

    //var rksj = new Date();
	var rksj= new Date().format("yyyy-MM-dd hh:mm:ss");
	
    //var latLng = Geolocation.latLng();
    var latLng = GPS.gcj_encrypt(28.330562,112.92148);
    var post_gps = {
        marker : {       //创建数组类的变量
        lat: latLng.lat,    
        lng: latLng.lng,
        },
        rksj : rksj
      };
  
    console.log('post_gps：');
    console.log(post_gps);
    
    var id = Session.get('id');
     //Gps.update({_id: id}, {$addToSet: {gps: post_gps}});
	 Gps.update({_id: id}, {$addToSet: {gps: post_gps}}, function(error,result) {
      if (error) {
         // 向用户显示错误信息
         console.log('error:' + error);
      } else {
		  //alert(Session.get('id'));
		  console.log('保存成功！');
      }
    });

  },
  'click [data-action=save]': function (event, template) {
      IonModal.close();
      // Router.go("/profile");
  }
});
// 集合名.update({_id: _id}, $addToSet: {marker: {经纬度}}});
