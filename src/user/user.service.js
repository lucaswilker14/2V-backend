var mongoose = require('mongoose');
const response = require('../util/responses');
const User = mongoose.model('User');
const thingService = require('../things/thing.service');

//save
exports.post = async (user, callback) => {
    var user = new User(user); //criando um usuario
    await user.save().then((result) => {
        callback(response.created('Usuário Criado com Sucesso!', result));
    }).catch((err) => {
        callback(response.badRequest('Parametro Inválido'));
    });
}

//busca
exports.getById = async (id, callback) => {
    await User.findById({_id: id}).then((result) => {
        callback(response.ok('Busca concluída com Sucesso', result));
    }).catch((err) => {
        callback(response.notFound('Usuário não encontrado'));
    });;
    
}

//adicionando na lista do usuario um item que foi emprestado
exports.addItem = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $push: {borrewed: [itemId] }})
    .then((result) => {
        callback(response.ok('Item Adicionado! (Emprestado)', result));
    }).catch((err) => {
        callback(response.badRequest('Não foi possível Adicionar Item'));
    });
};

//removendo da lista do usuario um item que foi emprestado, ou seja, foi devolvido. 
exports.returnedItem = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $pull: {borrewed: mongoose.Types.ObjectId(itemId) }})
    .then(() => {
        callback(response.ok("Item Devolvido!", ''));    
    }).catch((err) => {
        callback(response.badRequest('Não foi possivel remover o item'));
    });
    await thingService.removeItem(itemId);
};

//pegando os item de cada usuario
exports.getItemByUser = async (userId, callback) => {

    let borrewed = await User.findById({_id: mongoose.Types.ObjectId(userId)})
    .select('borrewed')
    .populate('borrewed');
    
    if (borrewed.borrewed) {
        callback(response.ok('Busca concluida', borrewed.borrewed));
    } else {
        callback(response.notFound("Usuário não Existe!"));
    }
};
