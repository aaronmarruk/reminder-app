Template.reminderEdit.created = function() { 
	Session.set('reminderEditErrors', {});
}

Template.reminderEdit.helpers({ 
	errorMessage: function(field) {
		return Session.get('reminderEditErrors')[field]; 
	},
	errorClass: function (field) {
		return !!Session.get('reminderEditErrors')[field] ? 'has-error' : '';
	},

	reminderEditSchema: Schemas.ReminderEdit
});

Template.reminderEdit.rendered = function() {
    $('.datetimepicker').datetimepicker({
    	minDate: new Date()
    });
}

Template.reminderEdit.events({ 
	'submit form': function(e) {
    	e.preventDefault();
		var currentReminderId = this._id;
		var reminderProperties = {
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			date: $(e.target).find('[name=date]').val()
		}

		var errors = validateReminder(reminderProperties); 
			if (errors.title || errors.message)
				return Session.set('reminderEditErrors', errors);

		Reminders.update(
			currentReminderId, 
			{ $set: reminderProperties }, 
			function(error) { 
				if (error) {
       		 		// display the error to the user
					throwError(error.reason);
				} else {
					Meteor.call('exampleCronJob', reminderProperties, 
						currentReminderId);
        			Router.go('remindersList', {_id: currentReminderId});
      			}
			}
		); 		
	},
	'click .delete': function(e) { 
		e.preventDefault();
		if (confirm("Delete this reminder?")) { 
			var currentReminderId = this._id; 
			Reminders.remove(currentReminderId); 
			Router.go('remindersList');
		} 
	}
});