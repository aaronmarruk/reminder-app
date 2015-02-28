Pages = new Meteor.Pagination(Reminders, {
	templateName: "remindersPages",
	itemTemplate: 'reminderItem',
	perPage: 10
});