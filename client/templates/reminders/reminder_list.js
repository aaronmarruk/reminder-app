Template.remindersList.helpers({
    reminders: function(){
        return Reminders.find({}, {sort: {submitted: -1}});
    }
});