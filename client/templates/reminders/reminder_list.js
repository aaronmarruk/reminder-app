//FIXME – I'm not sure this is needed now we are using paginate
Template.remindersList.helpers({
    reminders: function(){
        //return Reminders.find({}, { done: { $exists: true } });
    }
});