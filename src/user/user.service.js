var mongoose = require('mongoose');
const User = mongoose.model('User');
const thingService = require('../things/thing.service');

//save
exports.post = async (user, callback) => {
    var user = new User(user); //criando um usuario
    await user.save().then((result) => {
        callback('Usuario Salvo!');
    }).catch((err) => {
        callback(err);
    });
}

//busca
exports.getById = async (id, callback) => {
    var res = await User.findById({_id: id});
    callback(res);
}

//pegando os item de cada usuario
exports.getItemByUser = async (userId, callback) => {
    let borrewed = await User.findById({_id: mongoose.Types.ObjectId(userId)})
    .select('borrewed')
    .populate('borrewed');
    
    callback(borrewed.borrewed);
};

//adicionando na lista do usuario um item que foi emprestado
exports.addItem = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $push: {borrewed: [itemId] }}).then((result) => {
        callback('Item Adicionado! (Emprestado)');
    }).catch((err) => {
        callback(err);
    });
};

//removendo da lista do usuario um item que foi emprestado, ou seja, foi devolvido. 
exports.returnedItem = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $pull: {borrewed: mongoose.Types.ObjectId(itemId) }})
    .then((result) => {
        thingService.removeItem(itemId).then((result) => {
            callback(result);
        }).catch((err) => {
            callback(err);
        });
    }).catch((err) => {
        callback(err);
    });
};

