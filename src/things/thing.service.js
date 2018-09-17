const mongoose = require("mongoose");
const Thing = mongoose.model('Thing');

exports.post = async (thing, callback) => {
    var thing = new Thing(thing);
    await thing.save().then(() => {
        callback(thing);
    }).catch((err) => {
        callback(err);
    });;
}

exports.get = async (callback) => {
    Thing.find({}, 'user_adress name loan_date return_date ').then((result) => {
        callback(result);
    }).catch((err) => {
        callback(err);
    });;
}

exports.getItemById = async (id, callback) => {
    Thing.findById({_id: id}, 'user_adress name loan_date return_date').then((result) => {
        callback(result);
    }).catch((err) => {
        callback(err);
    });;
}


exports.removeItem = async (id, callback) => {
    var thing = await Thing.findById({_id: id});
    
    await thing.remove()
    .then((result) => {
        callback(result);
    }).catch((err) => {
        callback(err);
    });;
}


