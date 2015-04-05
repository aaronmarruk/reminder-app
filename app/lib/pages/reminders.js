Pages = new Meteor.Pagination(Reminders, {
	templateName: "remindersPages",
	itemTemplate: 'reminderItem',
	perPage: 3,
	divWrapper: 'reminders-list',
	filters: { done: { $exists: false } },
	auth: function(skip, sub){
        return Reminders.find({userId: sub.userId});    
    }
});