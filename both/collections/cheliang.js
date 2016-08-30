Cheliang = new Mongo.Collection('cheliang');

Cheliang.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Cheliang.helpers({
  datePosted: function () {
    return moment(this.createdAt).format('M/D');
  },
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
  voters: function () {
    return Meteor.users.find({_id: {$in: this.voterIds}});
  }
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Cheliang.search = function(query) {
  if (!query) {
    return;
  }
  return Cheliang.find({
    name: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Cheliang.TitleBX = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String
    }
});

Cheliang.attachSchema(new SimpleSchema({
  zuhao: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '工作组号'
    },
    max: 100
  },
  hphm: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '号牌号码'
    },
    max: 200
  },
  hpzl: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '号牌种类'
    },
    max: 100
  },
  jubao: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '举报'
    },
    max: 200
  },
  
  cl_id: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '车辆ID'
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
      placeholder: '内容说明'
    },
    max: 500
  },
 
  createdAt: {
    type: Date
  },
  userId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  voterIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  numberOfVotes: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  numberOfComments: {
    type: Number,
    optional: true,
    defaultValue: 0
  }, 
  marker: {
    type: Object,
    optional: true,
    blackbox: true
  },
  clPhoto: {
        type: Array,
        optional: true
  }, 
		'clPhoto.$': {
			type: Object
		},
		'clPhoto.$.title': {
			type: String
		},
		'clPhoto.$.share_cam': {
			type: String
		},
		'clPhoto.$.photo': {
			type: String
		}
  
}));
