Router.onBeforeAction('dataNotFound');
// Show login screen unless signed in
Router.onBeforeAction(function(){
	FlashMessages.clear();
	this.next(); 
});

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	splashTemplate: 'splashTemplate',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('reminders'); }
});

// Standard friendly request for login
var requireLogin = function() { 
	if (! Meteor.user()) {
		
		if (Meteor.loggingIn()) { 
			this.render(this.loadingTemplate);

		} else { 
			FlashMessages.sendError("You need to be logged in to do that.");
			this.render('loginPage');
		}
	} else {
		this.next(); 
	}
}

// Use attempting destructive function when not logged in
// var requireDestructivePermissions = function() { 
// 	if (! Meteor.user()) {
// 		if (Meteor.loggingIn()) { 
// 			this.render(this.loadingTemplate);
// 		} else { 
// 			this.render('accessDenied');
// 		}
// 	} else {
// 		this.next(); 
// 	}
// }

// Standard friendly request for login


Router.route('/new', {name: 'reminderSubmit'});
Router.route('/reminders', {name: 'remindersList'});

Router.route('/login', {name: 'loginPage', layoutTemplate: 'splashLayout'});
Router.route('/logout', {name: 'logout'});

Router.route('/sign-up', {name: 'registerPage', layoutTemplate: 'splashLayout'});

//Router.route('/splash', {name: 'splashPage'});

Router.route('/reminders/:_id/edit', {
	name: 'reminderEdit',
	data: function() {
		return Reminders.findOne(this.params._id); 
	}
});

Router.route('/', {name: 'splashPage', layoutTemplate: 'splashLayout'} );

var isLoggedIn = function() { 
	if (Meteor.user()) {
		Router.go('/new');
		if (Meteor.loggingIn()) { 
			this.render(this.loadingTemplate);
		} else { 
			Router.go('/new');
			this.render('reminderSubmit');
		}
	} else {
		this.next(); 
	}
}

Router.onBeforeAction(requireLogin, {
	only: ['remindersList']
});


Router.onBeforeAction(requireLogin, {
	only: ['reminderSubmit', 'reminderEdit']
});

Router.onBeforeAction(isLoggedIn, {
	only: ['splashPage', 'loginPage', 'registerPage']
});

// var clearFlash = 
// Router.onAfterAction(clearFlash, {
// 	only: [
// 		'reminderSubmit', 
// 		'reminderEdit', 
// 		'remindersList', 
// 		'splashPage', 
// 		'loginPage'
// 	]
// });





