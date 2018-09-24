var schedule = require('node-schedule');
const mongoose = require("mongoose");
const thingService = require('../things/thing.service');
const userService = require('../user/user.service');
const emailService = require('../util/emailSender');

const User = mongoose.model('User');


module.exports = () => {

    var today = new Date(Date.now());
    today = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    schedule.scheduleJob({hour: 18, minute: 55}, () => {
        
        thingService.get((response) => {
            
            response.forEach( async element => {

                var owner_name = await User.findById(element.owner, 'firstName secondName');
                owner_name = owner_name.firstName + " " + owner_name.secondName;

                var to = element.user_adress.email;
                
                var receiver = element.user_adress.name;
                
                var return_date = element.return_date.getDate() + "/" + (element.return_date.getMonth() + 1) + "/" + element.return_date.getFullYear();
                
                var describeItem = element.name;

                if (return_date === today) {
                    var mailOptions = userService.createMailOptions(to, receiver, return_date, describeItem, owner_name);
                    emailService.send(mailOptions);
                    console.log('Emails enviados!');
                }
            });
        });
});
}