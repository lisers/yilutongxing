Aqjk = new Mongo.Collection('aqjk');

Aqjk.allow({
  insert: function(userId, doc) {
    //只允许登录用户添加帖子
    return !! userId;
  },
    //update: function(userId, doc) {
    //只允许登录用户添加帖子
    //return !! userId;
    //}
  update: function() {
    //只允许登录用户添加帖子
    return true;
  } 
});



Aqjk.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Aqjk.search = function(query) {
  if (!query) {
    return;
  }
  return Aqjk.find({
    xh: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Aqjk.attachSchema(new SimpleSchema({
//xm xb csny xx sx_1 sx_2 fx_1 fx_2
//cf_dd dd_dd sx_wxdd zm_1 dd_1  zm_2 
//dd_2 zm_3 dd_3 zm_wxdd hj_jzdd hj_cqdd
//hj_wxdd sj_jzdd sj_cqdd sj_wxdd
//--------------------------------
//-------------儿童信息-----------
//--------------------------------

  xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  xb: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  csny: {
    type: Date,
    optional: true
  },
   xx: {
    type: String,
    optional: true,
    defaultValue: " "
  },



  sx_1: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  sx_2: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  fx_1: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  fx_2: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  cf_dd: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  dd_dd: {
   type: String,
    optional: true,
    defaultValue: " "
  },
  gl: {
   type: String,
    optional: true,
    defaultValue: " "
  },
  sx_wxdd: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  zm_1: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  dd_1: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  zm_2: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  dd_2: {
    type: Date,
    optional: true
  },
  zm_3: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  dd_3: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  zm_wxdd: {
    type: String,
    optional: true,
    defaultValue: " "
  },






  hj_jzdd: {
    type: String,
    optional: true,
    defaultValue: " "
  }, 
  hj_cqdd: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  hj_wxdd: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  sj_jzdd: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  sj_cqdd: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  sj_wxdd: {
    type: String,
    optional: true,
    defaultValue: " "
  }
}));
