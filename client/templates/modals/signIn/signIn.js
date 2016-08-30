Template.signIn.events({
  'click [data-action=sign-in]': function (event, template) {
    Meteor.loginWithMeteorDeveloperAccount({}, function (error) {
      if (error) {
        alert(error);
      } else {
        IonModal.close();
      }
    });
  }
});



var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
    {
        _id: 'phone',
        type: 'tel',
        displayName: "电话号码",
    },
  pwd
]);

var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // Successfully logged in
      // ...
        IonModal.close();
    }
    if (state === "signUp") {
      // Successfully registered
      // ...
        IonModal.close();
    }
  }
};

var myPreSubmitFunc = function(password, info){
	info.profile.votedProductIds = [];
};

AccountsTemplates.configure({
    onSubmitHook: mySubmitFunc,
    preSignUpHook: myPreSubmitFunc
});



Template.signIn.helpers({
  votedProducts: function () {
    return Products.find({_id: {$in: this.profile.votedProductIds}});
  }
});