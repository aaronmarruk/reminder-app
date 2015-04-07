Template.login.events({

    'submit #login-form' : function(e, t) {
      e.preventDefault();

      // retrieve the input field values
      var email = t.find('[name=email]').value
        , password = t.find('[name=password]').value;

      /*
      * FIXME - Trim and validate your fields here...
      */

      // If validation passes, supply the appropriate fields to the
      // Meteor.loginWithPassword() function.
      Meteor.loginWithPassword(email, password, function(err) {

        if (err) {
  			// The user might not have been found, or their passwword
  			// could be incorrect.
          FlashMessages.sendError("Looks like an invalid Username and P' +
            'assword. Please try again.");
        }
    	});
      return false; 
    }
});

Template.login.helpers({
    loginSchema: Schemas.Login
});