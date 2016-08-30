Photos = new Meteor.Collection("photos");

Photos.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Photos.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  }
});
