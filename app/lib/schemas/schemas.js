Schemas = {};
Schemas.Register = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email"
    },
    password: {
        type: String,
        label: "Password",
        min: 6
    },
    passwordConfirmation: {
        type: String,
        min: 6,
        label: "Password confirmation",
        custom: function() {
            if (this.value !== this.field('password').value) {
                return "passwordMissmatch";
            }
        }
    }
});

Schemas.Login = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email"
    },
    password: {
        type: String,
        label: "Password",
        min: 6
    }
});

Schemas.ReminderSubmit = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    message: {
        type: String,
        label: "Message"
    },
    date: {
        type: String
    }
});

Schemas.ReminderEdit = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    message: {
        type: String,
        label: "Message"
    },
    date: {
        type: String,
        label: "Time / Date"
    }
});