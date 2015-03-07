Router.onBeforeAction('dataNotFound');

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('reminders'); }
});

// Standard friendly request for login
var requireLogin = function() { 
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) { 
			this.render(this.loadingTemplate);
		} else { 
			this.render('splashPage');
		}
	} else {
		this.next(); 
	}
}

// Use attempting destructive function when not logged in
var requireDestructivePermissions = function() { 
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) { 
			this.render(this.loadingTemplate);
		} else { 
			this.render('accessDenied');
		}
	} else {
		this.next(); 
	}
}

Router.route('/list', {name: 'remindersList'});

Router.route('/splash', {name: 'splashPage'});

Router.route('/reminders/:_id/edit', {
	name: 'reminderEdit',
	data: function() {
		return Reminders.findOne(this.params._id); 
	}
});

Router.route('/', {name: 'reminderSubmit'});

Router.onBeforeAction(requireLogin, {
	only: ['remindersList']
});

Router.onBeforeAction(requireDestructivePermissions, {
	only: ['reminderSubmit', 'reminderEdit']
});


