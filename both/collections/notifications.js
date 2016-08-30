Notifications = new Mongo.Collection('notifications');

Notifications.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Notifications.helpers({
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

Notifications.search = function(query) {
  if (!query) {
    return;
  }
  return Notifications.find({
    name: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Notifications.attachSchema(new SimpleSchema({

  address: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '位置'
    },
    max: 200
  },
  
  url: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '互联网地址(http)'
    },
    max: 200
  },
  name: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '消息内容'
    },
    max: 200
  },
  tagline: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '备注'
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
  }
  
}));
