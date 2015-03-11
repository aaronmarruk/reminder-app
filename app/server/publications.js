Meteor.publish('reminders', function() { 
	return Reminders.find();
});