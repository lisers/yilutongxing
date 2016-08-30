Template.bxList.created = function () {
  this.autorun(function () {
    //this.subscription = Meteor.subscribe('product');
	this.subscription = Meteor.subscribe('baoxian');
  }.bind(this));
};

Template.bxList.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));

  bxCreate('');
};


Template.bxList.helpers({
  //photos: bxData,
  
  
  photos : function () {
	  console.log('Baoxian.find');
	  console.log(Meteor.userId());
	  //console.log(this.userId);
	  
	  var userid = Meteor.userId();  //"bbXvgc72NZ99ZThm8"
	  var sum = Baoxian.find().count();
      console.log(sum);
	  
	  sum = Baoxian.find({userId: userid}).count();
      console.log(sum);
	  
	  var mo= Baoxian.findOne({userId: userid});
	  console.log(mo.name);
      console.log(mo.bxPhoto);
	
      return mo.bxPhoto;
	  //return Baoxian.find({},{limit:1})
  },
  
  
  product: function () {
    return Products.findOne({_id: Router.current().params._id});
  },

  marker: function () {
    var latLng = Geolocation.latLng();
  	latLng=GPS.gcj_encrypt(latLng.lat,latLng.lng);
    return latLng.lat + "," + latLng.lng;
  }

});


Template.bxList.events({
	
  'click [data-action=cam_1]': function (event, template) {
		  console.log('1、事故全景照片');
		  photos('cam_1');
  },
  'click [data-action=cam_2]': function (event, template) {
		  console.log('2、车前照片');
		  photos('cam_2');
  },
  'click [data-action=cam_3]': function (event, template) {
		  console.log('3、车左边照片');
		  photos('cam_3');
  },
  'click [data-action=cam_4]': function (event, template) {
		  console.log('4、车后照片');
		  photos('cam_4');
  },
  'click [data-action=cam_5]': function (event, template) {
		  console.log('5、车右边照片');
		  photos('cam_5');
  },
  'click [data-action=cam_6]': function (event, template) {
		  console.log('6、故障位置照片');
		  photos('cam_6');
  },
  'click [data-action=cam_7]': function (event, template) {
		  console.log('7、行驶证照片');
		  photos('cam_7');
  },
  'click [data-action=cam_8]': function (event, template) {
		  console.log('8、驾驶证照片');
		  photos('cam_8');
  }
});


//初始化
var bxCreate = function (imageData) {
    var latLng = Geolocation.latLng();

    if (! latLng) {
      return;
    }
	
    console.log("Baoxian.insert");
	console.log(latLng);
    Meteor.call('Baoxian.insert', latLng,imageData);
};


//调用服务端 Baoxian.update
var bxUpdate = function (imageData,cam) {
    var latLng = Geolocation.latLng();

    if (! latLng) {
      return;
    }
	
    console.log("Baoxian.update");
	console.log(latLng);
    Meteor.call('Baoxian.update', latLng,imageData,cam);
};


// 拍照
var photos = function (cam) {
	
	var data= "data:image/jpeg;base64,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";
	
	console.log(cam);
	
	//bxUpdate(data,cam);
	
	/* */
	MeteorCamera.getPicture(function (error, data) {
	// we have a picture
	if (! error) {
			bxUpdate(data, cam);
		}
	});
};



  
  
  
  
  
/*
var bxData = [
  {
    title: '1、事故全景照片',
	share_cam: 'cam_1'
  }, 
  {
    title: '2、车前照片',
	share_cam: 'cam_2'
  }, 
  {
    title: '3、车左边照片',
	share_cam: 'cam_3'
  }, 
  {
    title: '4、车后照片',
	share_cam: 'cam_4'
  }, 
  {
    title: '5、车右边照片',
	share_cam: 'cam_5'
  },
  {
    title: '6、故障位置照片',
	share_cam: 'cam_6'
  }, 
  {
    title: '7、行驶证照片',
	share_cam: 'cam_7'
  }, 
  {
    title: '8、驾驶证照片',
	share_cam: 'cam_8'
  }
];
*/



  