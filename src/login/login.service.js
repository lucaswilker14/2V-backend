const mongoose = require("mongoose");
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const response = require('../util/responses');


exports.authenticate = async (data) => {

        const res = await User.findOne({
            username: data.username,
            password: data.password
        });
        return res;

};


