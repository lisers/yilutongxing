var ANIMATION_DURATION = 300;
var NOTIFICATION_TIMEOUT = 3000;
var IGNORE_CONNECTION_ISSUE_KEY = 'ignoreConnectionIssue';
var CONNECTION_ISSUE_TIMEOUT = 5000;

Session.setDefault(IGNORE_CONNECTION_ISSUE_KEY, true);

if (Meteor.isClient) {

  Meteor.subscribe('products');

  Tracker.autorun(function () {
    if (Reload.isWaitingForResume()) {
      alert("程序将更新到最新版本! ");
      window.location.reload();
    }
  });

}

Template.appLayout.rendered = function () {
  Session.set('currentTab', 'trending');
  

};

Template.appLayout.events({
  'click [data-action=share-product]': function (event, template) {
    IonActionSheet.show({
      titleText: 'Share Product',
      buttons: [
        { text: '<i class="icon ion-social-twitter"></i> Tweet' },
        { text: '<i class="icon ion-ios-email"></i> Email' },
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Tweet!');
        }
        if (index === 1) {
          console.log('Email!');
        }
        return true;
      }
    });
  },
  
  'click [data-action=gongzuozuBT]': function (event, template) {
    IonActionSheet.show({
      titleText: '管理员维护',
      buttons: [
        { text: '<i class="icon ion-ios-reverse-camera"></i> 录入工作组' }
      ],
      cancelText: '返回',
      buttonClicked: function(index) {
      
        if (!Meteor.user()) {
		   index=-1;
           IonModal.open('signIn');
        }
      
        if (index === 0) {
           console.log('录入工作组!');
           IonModal.open('newGongzuozu');
        }
		
        return true;
      }
    });
  } ,
  
    /* 这里添加一个新的按钮跳转办法*/
  'click [data-action=share-camm]': function (event, template) {
    IonActionSheet.show({
      titleText: '监督',
      buttons: [
        { text: '<i class="icon ion-ios-reverse-camera"></i> 评论' },

        { text: '<i class="icon ion-ios-camera"></i> 举报' },
 
      ],
      cancelText: '返回',
      buttonClicked: function(index) {
      
        if (!Meteor.user()) {
		 index=-1;
         IonModal.open('signIn');
        }


      
        if (index === 0) {
          console.log('评论');
          MeteorCamera.getPicture(function (error, data) {
	        // we have a picture
    	    if (! error) {
        	  lkonSuccess(data);
        	}
	      });
        }
        if (index === 1) {
          console.log('举报!');
          IonModal.open('ju');
        }
        return true;
      }
    });
  },
  
  'click [data-action=share-cam]': function (event, template) {
    IonActionSheet.show({
      titleText: '留守儿童信息',
      buttons: [
        { text: '<i class="icon ion-ios-americanfootball"></i>信息列表' },
        { text: '<i class="icon ion-ios-americanfootball"></i>信息录入' },
        { text: '<i class="icon ion-ios-americanfootball"></i>安全监控' },
        { text: '<i class="icon ion-ios-americanfootball"></i>地形录入' }
      ],
      cancelText: '返回',
      buttonClicked: function(index) {
      
        if (!Meteor.user()) {
		 index=-1;
         IonModal.open('signIn');
        }


      
        if (index === 0) {
          console.log('信息列表');
          IonModal.open('xxlb');
        }
	    
        if (index === 1) {
          console.log('学生信息录入! ');
          IonModal.open('br');
        }
        
        if (index === 2) {
          console.log('安全监控!');
          IonModal.open('aq_1');
        }
        
        if (index === 3) {
          console.log('gps!');
		      IonModal.open('gps');
        }
        return true;
      }
    });
  }  
  
});


var lkonSuccess = function (imageData) {
    var latLng = Geolocation.latLng();

    if (! latLng) {
      return;
    }
    console.log("Products.insert");


     Meteor.call('insertLK',latLng,imageData);


    Router.go("/trending");
};
  

Template.appLayout.helpers({
    connected: function() {
       return  Meteor.status().connected;
     },
    products: function () {
      return Products.find({}, {sort: {"createdAt": -1}});
    },
    photos: function () {
      return Photos.find({}, {sort: {"createdAt": -1}});
    }
});
  