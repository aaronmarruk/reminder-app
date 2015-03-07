Template.register.events({
    'submit #register-form' : function(e, t) {
        e.preventDefault();
        var email = t.find('[name=email]').value
        , password = t.find('[name=password]').value
        , passwordConfirmation = t.find('[name=passwordConfirmation]').value;

        // Trim and validate the input

        if (password === passwordConfirmation){
            Accounts.createUser({email: email, password : password}, function(err){
                if (err) {
                // Inform the user that account creation failed
                console.log(err);
                    if (err.error == 403){
                        FlashMessages.sendError("Email already exists");
                    }
                } else {
                // Success. Account has been created and the user
                // has logged in successfully. 
                alert('Thanks for signing up, at some point we will give you a tou'+
                    'r, but for now, go forth and create reminders!');
                }
            });
        }


        return false;
    }
});

Template.register.helpers({
    registerSchema: Schemas.Register
});