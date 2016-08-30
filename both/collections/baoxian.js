Baoxian = new Mongo.Collection('baoxian');

Baoxian.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Baoxian.helpers({
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

Baoxian.search = function(query) {
  if (!query) {
    return;
  }
  return Baoxian.find({
    name: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Baoxian.TitleBX = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String
    }
});

Baoxian.attachSchema(new SimpleSchema({

  address: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '位置'
    },
    max: 200
  },
  tagline: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Tagline'
    },
    max: 200
  },
  url: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Product URL'
    },
    max: 200
  },
  name: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Product Name'
    },
    max: 200
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
  createdAt: {
    type: Date
  },
  image: {
    type: String,
    optional: true,
    defaultValue: " "
  },  
  marker: {
    type: Object,
    optional: true,
    blackbox: true
  },
  titlePro: {
    type: [Object]
  }, 
  bxPhoto: {
        type: Array,
        optional: true
  }, 
    'bxPhoto.$': {
        type: Object
    },
    'bxPhoto.$.title': {
        type: String
    },
    'bxPhoto.$.share_cam': {
        type: String
    },
	'bxPhoto.$.photo': {
        type: String
    }
  
}));
