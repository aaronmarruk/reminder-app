Template.reminderSubmit.events({ 
	'submit form': function(e) {
		e.preventDefault();
		var reminder = {
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		};
		var errors = validateReminder(reminder); 
		if (errors.title || errors.message)
			return Session.set('reminderSubmitErrors', errors);
		
		Meteor.call('reminderInsert', reminder, function(error, result) { 
			// display the error to the user and abort
			if (error)
				return throwError(error.reason);
			// show this result but route anyway
			if (result.reminderExists)
				throwError('This link has already been posted');
	      	Router.go('remindersList');
    	});
	}
});

Template.reminderSubmit.created = function() { 
	Session.set('reminderSubmitErrors', {});
}

Template.reminderSubmit.helpers({ 
	errorMessage: function(field) {
		return Session.get('reminderSubmitErrors')[field]; 
	},
	errorClass: function (field) {
		return !!Session.get('reminderSubmitErrors')[field] ? 'has-error' : '';
	} 
});