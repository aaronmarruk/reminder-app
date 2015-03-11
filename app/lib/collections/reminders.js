Reminders = new Mongo.Collection('reminders');

Reminders.allow({
	update: function(userId, reminder) { 
		return ownsReminder(userId, reminder); 
	}, 
	remove: function(userId, reminder) { 
		return ownsReminder(userId, reminder); 
	},
});

Reminders.deny({
	update: function(userId, reminder, fieldNames) {
    	// may only edit the following two fields:
		return (_.without(fieldNames, 'title', 'message', 'date').length > 0); 
	}
});

Reminders.deny({
	update: function(userId, reminder, fieldNames, modifier) {
		var errors = validateReminder(modifier.$set);
		return errors.title || errors.message; 
	}
});

validateReminder = function (reminder) { 
	var errors = {};
	if (!reminder.title)
		errors.title = "Please fill in a title";
	if (!reminder.message)
		errors.message = "Please fill in a message";
	return errors; 
}

Meteor.methods({
	reminderInsert: function(reminderAttributes) {
	    check(Meteor.userId(), String);
	    check(reminderAttributes, {
			title: String,
			message: String,
			date: String
	    });

	    var errors = validateReminder(reminderAttributes); 
	    if (errors.title || errors.message)
			throw new Meteor.Error('invalid-reminder', 
				"You must set a title and message for your reminder");

	    var reminderWithSameMessage = Reminders.findOne({
	    	message: reminderAttributes.message
	    }); 

	    if (reminderWithSameMessage) {
			return {
				reminderExists: true,
				_id: reminderWithSameMessage._id
			} 
		}

		var user = Meteor.user();
		var reminder = _.extend(reminderAttributes, {
			userId: user._id, 
			author: user.username, 
			submitted: new Date()
		});

		var reminderId = Reminders.insert(reminder);
		console.log(reminderId);
		return {
			_id: reminderId
		}; 
	}
});

Meteor.methods({
	reminderDone: function(id) {
		// On done, set done true so we can hide and let user delete later
		Reminders.update({ _id: id }, { $set: { done: true } });
	}
});