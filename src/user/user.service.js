var mongoose = require('mongoose');
const User = mongoose.model('User');
const thingService = require('../things/thing.service');

//save
exports.post = async (user, callback) => {
    var user = new User(user); //criando um usuario
    await user.save().then((result) => {
        callback('Usuário Cadastrado!')
    }).catch((err) => {
        callback(err);
    });
}

//busca
exports.getById = async (id, callback) => {
    await User.findById({_id: id}).then((result) => {
        callback(result);
    }).catch((err) => {
        callback("Usuário não encontrado!");
    });;
    
}


//adicionando na lista do usuario um item que foi emprestado
exports.addItem = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $push: {borrewed: [itemId] }})
    .then((result) => {
        callback('Item Adicionado! (Emprestado)');
    }).catch((err) => {
        callback(err);
    });
};

//removendo da lista do usuario um item que foi emprestado, ou seja, foi devolvido. 
exports.returnedItem = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $pull: {borrewed: mongoose.Types.ObjectId(itemId) }})
    .then(() => {
        callback("Item Devolvido!");    
    }).catch((err) => {
        callback(err);
    });
    await thingService.removeItem(itemId);
};

//pegando os item de cada usuario
exports.getItemByUser = async (userId, callback) => {

    let borrewed = await User.findById({_id: mongoose.Types.ObjectId(userId)})
    .select('borrewed')
    .populate('borrewed');
    
    if (borrewed.borrewed) {
        callback(borrewed.borrewed)
    } else {
        callback("Usuário não Existe!");
    }
};
