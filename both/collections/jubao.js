Jubao = new Mongo.Collection('jubao');

Jubao.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
  doc.xintiaoAt = new Date();
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Jubao.search = function(query) {
  if (!query) {
    return;
  }
  return Jubao.find({
    name: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Jubao.attachSchema(new SimpleSchema({
  jubao: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '举报'
    },
    max: 200
  },
  address: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '地址'
    },
    max: 200
  },
  note: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '备注'
    },
    max: 500
  },
  
  createdAt: {
    type: Date
  },
  xintiaoAt: {
    type: Date
  },
  marker: {
    type: Object,
    optional: true,
    blackbox: true
  }, 
  image: {
    type: String,
    optional: true,
    defaultValue: " "
  }
}));
