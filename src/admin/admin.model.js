const mongoose = require('mongoose');
const User = require('./../user/user.model');

const adminSchema = User.discriminator("Admin", new mongoose.Schema({

}));
const Admin = mongoose.model('Admin');
module.exports = Admin;