if (Reminders.find().count() === 0) { 
	Reminders.insert({
		title: 'Google',
		message: 'http://google.com',
		author: 'Aaron Marr'
	});
	Reminders.insert({
		title: 'Facebook',
		message: 'http://facebook.com',
		author: 'Aaron Marr'
	});
}