Gongzuozu = new Mongo.Collection('gongzuozu');

Gongzuozu.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
  doc.xintiaoAt = new Date();
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Gongzuozu.search = function(query) {
  if (!query) {
    return;
  }
  return Gongzuozu.find({
    name: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Gongzuozu.attachSchema(new SimpleSchema({
  name: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '工作组名'
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
  interval: {
    type: Number,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '间隔时间'
    },
	defaultValue: 5,
    min: 0
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
