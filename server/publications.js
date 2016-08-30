//发布

Meteor.publish('veh', function() {
  return Veh.find();
});


Meteor.publish('veh', function() {
  return Veh.find();
});

Meteor.publish('bjs', function() {
  return Bjs.find();
});

Meteor.publish('photos', function() {
  return Photos.find();
});

Meteor.publish('products', function() {
  return Products.find();
});

Meteor.publish('notifications', function() {
  return Notifications.find();
});

Meteor.publish('baoxian', function() {
  return Baoxian.find();
});

Meteor.publish('cheliang', function() {
  return Cheliang.find();
});

Meteor.publish('gongzuozu', function() {
  return Gongzuozu.find();
});

Meteor.publish('aqjk', function() {
  return Aqjk.find();
});

Meteor.publish('jubao', function() {
  return Jubao.find();
});

Meteor.publish('brxx', function() {
  return Brxx.find();
});

Meteor.publish('gps', function() {
  return Gps.find();
});

Meteor.publish('tingche', function() {
  return Tingche.find();
});

Meteor.publish('productsSearch', function(query) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Products.search(query);
});

Meteor.publishComposite('product', function(_id) {
  return {
    find: function() {
      return Products.find({_id: _id});
    },
    children: [
      {
        find: function(product) {
          return Meteor.users.find({_id: product.userId});
        }
      },
      {
        find: function(product) {
          return Meteor.users.find({_id: product.voterIds});
        }
      },
	  {
        find: function(product) {
          return Meteor.users.find({_id: product.voterDownIds});
        }
      },
      {
        find: function(product) {
          return Comments.find({productId: product._id});
        },
        children: [
          {
            find: function(comment) {
              return Meteor.users.find({_id: comment.userId});
            }
          }
        ]
      }
    ]
  };
});

Meteor.publishComposite('user', function(_id) {
  return {
    find: function() {
      return Meteor.users.find({_id: _id});
    },
    children: [
      {
        find: function(user) {
          return Products.find({_id: {$in: user.profile.votedProductIds}});
        }
      }
    ]
  };
});


/*
Meteor.publishComposite('baoxian', function(_id) {
  return {
    find: function() {
      return Baoxian.find({_id: _id});
    },
    children: [
      {
        find: function(baoxian) {
          return Meteor.users.find({_id: baoxian.userId});
        }
      }
    ]
  };
});
*/
