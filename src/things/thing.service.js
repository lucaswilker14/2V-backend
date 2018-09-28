const mongoose = require("mongoose");
const Thing = mongoose.model('Thing');
const response = require('../util/responses');

exports.post = async (thing, owner) => {
    var thing = new Thing(thing);
    var res = await thing.save()
    await Thing.findByIdAndUpdate(thing._id, { $set: {owner: owner}});
    return res;

}

exports.get = async (callback) => {
    Thing.find({}, 'user_adress name loan_date return_date owner').then((result) => {
        callback(result);
    }).catch((err) => {
        callback(err);
    });;
}

exports.getItemById = async (id, callback) => {
    Thing.findById({_id: mongoose.Types.ObjectId(id)}).then((result) => {
        callback(result);
    }).catch((err) => {
        callback(err.message);
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


