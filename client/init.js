Meteor.startup(function () {
//  Geolocation.currentLocation();
  T9n.setLanguage("zh_cn");
//  GoogleMaps.load();
  GoogleMaps.load({ v: '3', key: 'AIzaSyDlc0V08-v9F1YaFbSa65tngWpz0msJZA8' });

  GoogleMaps.loadUtilityLibrary('/js/richmarker.js')
  GoogleMaps.loadUtilityLibrary('/js/maplabel.js')
  GoogleMaps.loadUtilityLibrary('/js/markerwithlabel.js')
 
 
 
//   QqMaps.load();

  
  //解决地图调用浏览器

  if (Meteor.isCordova) {
      platform = device.platform.toLowerCase();        
	  console.log(platform);

      if (platform === 'android') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            navigator.app.loadUrl(url, { openExternal: true });
            e.preventDefault();
        });
      }
      if  (platform === 'ios') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            window.open(url, '_system');
            e.preventDefault();
        });
      }
  }

  
  
  Meteor.subscribe('test');

});
