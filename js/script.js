/*
	Project: Reminders App
	Authors: Aaron Marr
*/


// Create a closure to maintain scope of the '$' and REMINDERS
;(function (REMINDERS) {

	

		REMINDERS.Config.init();

	



	REMINDERS.Config = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			console.debug('Kickoff is running');
		}
	};

	// Example module
	/*
	REMINDERS.Ui = {
		init : function() {
			REMINDERS.Ui.modal();
		},

		modal : function() {

		}
	};
	*/


})(window.REMINDERS = window.REMINDERS || {});

