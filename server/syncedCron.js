// optionally set the collection's name that synced cron will use
SyncedCron.options.collectionName = 'somethingDifferent';

Meteor.startup(function () {
// code to run on server at startup
	SyncedCron.start();
});

Meteor.methods({
	exampleCronJob: function(reminder, id) {

		var title = reminder.title,
			message = reminder.message,
			date = reminder.date;

	   	SyncedCron.add({
			name: id,
			schedule: function(parser) {
				// parser is a later.parse object
				var dateArray = date.split(/[\/\:\s]/g);
				// There's a bug with later.js when there are no dates in 
				// future schedule, so we'll repeat every year and then 
				// immediately remove the job once it's complete
				var hour = '';
				if(dateArray[5] === 'AM'){
			      	hour = dateArray[3]*1
			    } else {
			      	hour = dateArray[3]*1+12
			    }
				return parser.recur().every(1).year().on(dateArray[0]*1)
				  	.month()
			      	.on(dateArray[1]*1)
			      	.dayOfMonth()
			      	.on(dateArray[2]*1)
			      	.year()
			      	.on(hour)
			      	.hour()
			      	.on(dateArray[4]*1)
			      	.minute();
			}, 
			job: function(reminder) {
				console.log('crunching numbers', reminder);
				// Remove the job once complete
				SyncedCron.remove(id);
			}
		});
	}
});