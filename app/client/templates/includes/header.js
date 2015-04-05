Template.header.helpers({ 
	userEmail: function() {
		return Meteor.user().emails[0].address;
	}
});