Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster%40sandbox2cb5a5696264448f847589c74e80bcf7.mailgun.org:1de969a0ae8b57be54d25173b6ee2d65@smtp.mailgun.org:587';

    // Email.send({
    //     from: "reminders.later@gmail.com",
    //     to: "aaronmarruk@gmail.com",
    //     subject: "Meteor Can Send Emails via Gmail",
    //     text: "I just sent this email form meteor!"
    // });
});