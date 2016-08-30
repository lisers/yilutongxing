Gps = new Mongo.Collection('gps');

Gps.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  },
//  update: function(userId, doc) {
    // 只允许登录用户添加帖子
//    return !! userId;
//  }
  update: function() {
    // 只允许登录用户添加帖子
    return true;
  } 
});



Gps.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});
RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Gps.search = function(query) {
  if (!query) {
    return;
  }
  return Gps.find({
    xh: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Gps.attachSchema(new SimpleSchema({
  mc: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  lx: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  time: {
    type: String,
    optional: true
  },
  // marker: {
  //   type: [Object],
  //   optional: true,
  //   blackbox: true
  // }
  gps: {            //定义数组类的存入类型
    type: Array, 
    optional: true
  }, 
  'gps.$': {
    type: Object
  },
  'gps.$.rksj': {
    type: String
  },
  'gps.$.marker': {
    type: Object,
    optional: true,
    blackbox: true
  }

}));
