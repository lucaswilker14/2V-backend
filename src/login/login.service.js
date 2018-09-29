const mongoose = require("mongoose");
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const response = require('../util/responses');


exports.authenticate = async (data) => {

    var admin = verifyAdmin(data.username);

    console.log(admin);

    if (!admin) {
        
        const res = await User.findOne({
            username: data.username,
            password: data.password
        });
        return res;
        
    } else {
        return admin
    }


};

const verifyAdmin = async (username) => {
    var res = await Admin.findOne({
        username: username
    });
    return res;
};
