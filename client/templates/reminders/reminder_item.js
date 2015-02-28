Template.reminderItem.helpers({ 
	ownReminder: function() {
		return this.userId === Meteor.userId(); 
	}
});
