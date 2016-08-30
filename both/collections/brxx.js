Brxx = new Mongo.Collection('brxx');

Brxx.allow({
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



Brxx.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Brxx.search = function(query) {
  if (!query) {
    return;
  }
  return Brxx.find({
    xh: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Brxx.attachSchema(new SimpleSchema({
//xm xh xb csny sfz qq tel email wx jtzz bzr bzrdz bzrtel
//--------------------------------
//-------------儿童信息-----------
//--------------------------------
  marker: {
    type: Object,
    optional: true,
    blackbox: true
  },
  photo: {
         type: String,
         optional: true,
         defaultValue: " "
  }, 
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
  mz: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  csny: {
    type: Date,
    optional: true
  },
  sfz: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  hkdj: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  hjszd: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  xjzdz: {
    type: String,
    optional: true,
    defaultValue: " "
  },


//--------------------------------
  xjzdzjwd: {
    type: String,
    optional: true,
    defaultValue: " "
  },
//--------------------------------



  stqk: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  cjlb: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  hblx: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  xxjs: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  jxqk: {
    type: String,
    optional: true,
    defaultValue: " "
  },


//--------------------------------
  xxqk: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  lslx: {
    type: String,
    optional: true,
    defaultValue: " "
  },
//--------------------------------



//--------------------------------
//-------------家庭情况-----------
//--------------------------------
  zf_xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  zf_csny: {
    type: Date,
    optional: true
  },
  zm_xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  zm_csny: {
    type: Date,
    optional: true
  },
  wzf_xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  wzf_csny: {
    type: Date,
    optional: true
  },
  wzm_xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  wzm_csny: {
    type: Date,
    optional: true
  },
  fq_xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  fq_csny: {
    type: Date,
    optional: true
  },
  fq_tel: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  fq_sfz: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  fq_wgdd: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  mq_xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  mq_csny: {
    type: Date,
    optional: true
  },
  mq_tel: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  mq_sfz: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  mq_wgdd: {
    type: String,
    optional: true,
    defaultValue: " "
  },

//--------------------------------
//----------实际监护情况----------
//--------------------------------

  fmwc: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  s_fmwc: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  wjhnl: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  qtjhr: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  jhlx: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  gx: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  jhr_xm: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  jhr_tel: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  jhr_sfz: {
    type: String,
    optional: true,
    defaultValue: " "
  },
  jhr_jzdz: {
    type: String,
    optional: true,
    defaultValue: " "
  },
//--------------------------------
//----------家庭、救助------------
//--------------------------------
  jjly: {
     type: [String],
     optional: true,
     defaultValue: []
  },
  bfqk: {
     type: [String],
     optional: true,
     defaultValue: []
  },



//--------------------------------
  bfxx: {
     type: [String],
     optional: true,
     defaultValue: []
  },
  qtqk: {
    type: String,
    optional: true,
    defaultValue: " "
  }
//--------------------------------




}));
