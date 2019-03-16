const mongoose = require("mongoose");
const Thing = mongoose.model('Thing');
const response = require('../util/responses');

exports.post = async (thing, owner) => {
    var new_thing = new Thing(thing);
    var res = await new_thing.save()
    await Thing.findByIdAndUpdate(new_thing._id, { $set: {owner: owner}});
    return res;

}

exports.get = async (callback) => {
    await Thing.find({}, 'user_adress name loan_date return_date owner').then((result) => {
        callback(result);
    }).catch((err) => {
        callback(err);
    });;
}

exports.getItemById = async (id, callback) => {
    await Thing.findById({_id: id})
    .then((result) => {
        return callback(result);
    }).catch((err) => {
        return callback(err.message);
    });
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


