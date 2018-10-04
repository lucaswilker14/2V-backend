const mongoose = require("mongoose");
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');



exports.authenticate = async (data) => {

    const user = await User.findOne({
        username: data.username
    });

    if(!user) return null
    if(user.comparePassword(data.password)) return user;

};


