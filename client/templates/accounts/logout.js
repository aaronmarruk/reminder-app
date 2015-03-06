Template.logout.events({

    'click #logout-button' : function(e, t){
      e.preventDefault();

        Meteor.logout(function(err){
          if (err) {
      // The user might not have been found, or their passwword
      // could be incorrect. Inform the user that their
      // login attempt has failed. 
          } else {
            // The user has been logged in.
          }
        });
        return false; 
    }
});