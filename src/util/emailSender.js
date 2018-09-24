const config = require('../config/config');
var sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(config.sendGridKey);



exports.send = async (mailOptions) => {
    console.log(mailOptions);
    sendgrid.send({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text
    });
}