var mongoose = require('mongoose');
const response = require('../util/responses');
const User = mongoose.model('User');
const thingService = require('../things/thing.service');
const schedule = require('node-schedule');


//save
exports.post = async (user, callback) => {
    var user = new User(user); //criando um usuario
    await user.save().then((result) => {
        callback(response.created('Usuário Criado com Sucesso!', result));
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });
}

//busca por id
exports.getById = async (id, callback) => {
    await User.findById({_id: id}).then((result) => {
        callback(response.ok('Busca concluída com Sucesso', result));
    }).catch((err) => {
        callback(response.notFound('Usuário não existe!'));
    });;
    
}

//pegando os item de cada usuario
exports.getItemByUser = async (userId, callback) => {

    try {
        let borrewed = await User.findById({_id: mongoose.Types.ObjectId(userId)})
        .select('borrewed')
        .populate('borrewed');
    
        if (borrewed.borrewed.length > 0) {
            callback(response.ok('Busca concluida', borrewed.borrewed));
        } else {
            callback(response.notFound("Nenhum Item Encontrado!"));
        }
    } catch (error) {
        callback(response.notFound("Usuário não Existe!"));
    }
};

//adicionando na lista do usuario um item que foi emprestado
exports.addItemInBorrewed = async (userId, itemId, callback) => {
    //encontra e atualiza
    await User.findByIdAndUpdate(userId, { $push: {borrewed: [itemId] }})
    .then((result) => {
        callback(response.ok('Item Adicionado! (Lista de Emprestados)', result));
    }).catch((err) => {
        callback(response.badRequest('Não foi possível Adicionar Item'));
    });
};

//adicionando na lista do usuario um item que foi emprestado
exports.addItemInReturned = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $push: {returned: [itemId] }})
    .then((result) => {
        callback(response.ok('ADICIONADO AOS DEVOLVIDOS!', result));
    }).catch((err) => {
        callback(response.badRequest('Não foi possível devolver o Item'));
    });
};

//removendo da lista do usuario um item que foi emprestado, ou seja, foi devolvido. 
exports.removeItemInBorrewed = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $pull: {borrewed: mongoose.Types.ObjectId(itemId) }})
    .then(() => {
        callback(response.ok("Item Removido da Lista de Emprestados!", ''));    
    }).catch((err) => {
        callback(response.badRequest('Não foi possivel remover o item. Usuário não encontrado!'));
    });
    // await thingService.removeItem(itemId);
};

//removendo da lista do usuario um item que foi emprestado, ou seja, foi devolvido. 
exports.removeItemInReturned = async (userId, itemId, callback) => {
    
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $pull: {returned: mongoose.Types.ObjectId(itemId) }})
    .then((result) => {
        callback(response.ok("Item Removido da Lista de Devolvidos!", result));    
    }).catch((err) => {
        callback(response.badRequest('Não foi possivel remover o item'));
    });
    //remove item
    await thingService.removeItem(itemId);
};

//criacao das opcoes de envio
exports.createMailOptions = (to, receiver, loan_date, describeItem, ownerName) => {

    let mailOptions = {
        from: "2VService@email.com",
        subject: "Solicitação de Devolução"
    }

    //para quem enviar
    mailOptions['to'] = to;
    mailOptions['receiver'] = receiver;
    mailOptions['loan_date'] = loan_date; 

    //descricao do item
    mailOptions['describeItem'] = describeItem;

    mailOptions['solicitor'] = ownerName;

    //corpo do email
    mailOptions.text = "Caro, " + mailOptions.receiver  + "\n\n\n" + mailOptions.solicitor + " solicita o item emprestado de volta!" + "\n\n" 
                        + "Descrição: " + "\n" + " - " + mailOptions.describeItem + " - Data de emprestimo: " + mailOptions.loan_date;

    return mailOptions;

};
