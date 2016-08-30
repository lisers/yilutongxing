Meteor.startup(function() {
   if (Veh.find({}).count() === 0) {
      Veh.insert({"lng":"113.0","lat":"28.0"});
  }
});
