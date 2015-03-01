// optionally set the collection's name that synced cron will use
SyncedCron.options.collectionName = 'somethingDifferent';

Meteor.startup(function () {
// code to run on server at startup
	SyncedCron.start();

	// Stop jobs after 15 seconds
	// Meteor.setTimeout(function() { SyncedCron.stop(); }, 15 * 1000);
});

Meteor.methods({
	exampleCronJob: function() {
	   	SyncedCron.add({
			name: 'Crunch some important numbers for the marketing department',
			schedule: function(parser) {
				// parser is a later.parse object
				return parser.text('every 5 seconds');
			}, 
			job: function() {
				console.log('crunching numbers')
			}
		});
	}
});