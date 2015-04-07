Template.logout.events({

  'click #logout-button' : function(e, t){
    e.preventDefault();

      Meteor.logout(function(err){
        if (err) {
          FlashMessages.sendError("An error occured. Please try again");
        } else {          
          /*
          * FIXME - should we call router go here?
          */
          Router.go('splashPage');
        }
      });
      return false; 
    }
});