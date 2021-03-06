var mongoose = require('mongoose');
const response = require('../util/responses');
const User = mongoose.model('User');
const Thing = mongoose.model('Thing');
const thingService = require('../things/thing.service');
const fs = require('fs');

//save
exports.post = async (userBody, callback) => {

    var user = new User(userBody); //criando um usuario
    if(user.image === '') user.image = undefined
    await user.save().then((result) => {
        callback(response.created('Usuário Criado com Sucesso!', result._id));
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });
}

//busca por id
exports.getById = async (id, callback) => {
    await User.findById({_id: id}, '-password').then((result) => {
        if (!result) callback(response.notFound('Usuário não existe!')); 
        else callback(response.ok('Busca concluída com Sucesso', result));
    }).catch((err) => {
        callback(response.notFound('Usuário não existe!'));
    });;
    
}

//pegando os item de cada usuario
exports.getItemByUser = async (userId, callback) => {

    try {
        let borrewed = await User.findById({_id: mongoose.Types.ObjectId(userId), new: true})
        .select('borrewed')
        .populate('borrewed');

        if (borrewed.borrewed.length !== 0) {
            return callback(response.ok('Busca concluida', borrewed.borrewed));
        }
        else {
            return callback(response.notFound("Nenhum Item Encontrado!"));
        }
    } catch (error) {
        callback(response.notFound("Usuário não Existe!"));
    }
};

exports.getReturnedItems = async (userId, callback) => {

    try {
        let returned = await User.findById({_id: mongoose.Types.ObjectId(userId)})
        .select('returned')
        .populate('returned');

    
        if (returned.returned.length > 0) callback(response.ok('Busca concluida', returned.returned));
        else callback(response.notFound("Nenhum Item Encontrado!"));
    } catch (error) {
        callback(response.notFound("Usuário não Existe!"));
    }
};

//adicionando na lista do usuario um item que foi emprestado
exports.addItemInBorrewed = async (userId, itemId, callback) => {
    //encontra e atualiza
    await User.findByIdAndUpdate(userId, { $push: {borrewed: [itemId] }})
    .then((result) => {
        callback(response.created('Item Adicionado! (Lista de Emprestados)', result));
    }).catch((err) => {
        callback(response.badRequest('Não foi possível Adicionar Item'));
    });
};

//adicionando na lista do usuario um item que foi emprestado
exports.addItemInReturned = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(userId, { $push: {returned: [itemId] }, new: true})
    .then((result) => {
        callback(response.ok('Adicionado aos Devolvidos!', result));
    }).catch((err) => {
        callback(response.badRequest('Não foi possível devolver o Item'));
    });
};

//removendo da lista do usuario um item que foi emprestado, ou seja, foi devolvido. 
exports.removeItemInBorrewed = async (userId, itemId, callback) => {
    
    var item = await Thing.findById({_id: itemId});
    if (!item) callback(response.badRequest('Não foi possivel remover o item'));
    
    await User.findByIdAndUpdate(userId, { $pull: {borrewed: itemId }, new: true })
    .then((result) => {
        callback(response.ok("Item Removido da Lista de Emprestados!", ''));    
    }).catch((err) => {
        callback(response.badRequest('Não foi possivel remover o item. Usuário não encontrado!'));
    });
};

//removendo da lista do usuario um item que foi emprestado, ou seja, foi devolvido. 
exports.removeItemInReturned = async (userId, itemId, callback) => {
    
    var item = await Thing.findById({_id: itemId});
    if (!item) return callback(response.badRequest('Não foi possivel remover o item'));
    
    await User.findByIdAndUpdate({_id: userId}, { $pull: {returned: itemId }, new: true})
    .then((result) => {
        callback(response.ok("Item Removido da Lista de Devolvidos!", result));    
    }).catch((err) => {
        callback(response.badRequest('Não foi possivel remover o item'));
    });
    //remove item
    await thingService.removeItem(itemId);
};

exports.removeUser = async (userId, callback) => {

    User.findByIdAndRemove({_id: userId})
    .then((result) => {
        if (result) callback(response.ok('Sua conta foi excluida!', ''));    
        else callback(response.internalError());
    }).catch((err) => {
        console.log(err);
        callback(response.internalError());
    });
}

exports.recoveryPasswordUser = async (userId, new_password, callback) => {
    await User.findByIdAndUpdate({_id: userId}, { $set: { password: new_password}})
    .then((result) => {
        if (result) callback(response.ok('Senha Alterada Com sucesso', ''));    
        else callback(response.internalError());
    }).catch((err) => {
        console.log(err);
        callback(response.internalError());
    });
};
