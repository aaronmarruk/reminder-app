// check that the userId specified owns the documents
ownsReminder = function(userId, reminder) { 
	return reminder && reminder.userId === userId;
}