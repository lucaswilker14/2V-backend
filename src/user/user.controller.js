const userService = require('../user/user.service');
const thingService = require('../things/thing.service');
const mongoose = require("mongoose");
const emailService = require('../util/emailSender');
const User = mongoose.model('User');
const response = require('../util/responses');
const auth = require('./../util/auth-service');

//salva usuario
exports.post = ('/', async (req, res) => {

    try {
        await userService.post(req.body, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.send(error);
    }
});

//busca pelo id
exports.getById = ('/', async (req, res) => {

    //dessa forma eu recupero os dados do usuario logado!!
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await auth.decodeToken(token);

    if(req.params.userId != data.id) return res.status(401).send(response.unauthorized('Acesso não autorizado! Ids diferentes'));

    try {
        await userService.getById(data.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.status(response.status);
    }
});

//busca os itens emprestado pelo usuarios
exports.getItems = ('/items', async (req, res) => {

    //dessa forma eu recupero os dados do usuario logado!!
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await auth.decodeToken(token);
    
    if(req.params.userId != data.id) return res.send(response.unauthorized('Acesso não autorizado! Ids diferentes!!!'));

    try {
        await userService.getItemByUser(data.id, (response) => {
            res.status(response.status).send(response);
       }); 
    } catch (error) {
        res.status(response.status);
    }
});

//empresta um item
exports.addItem = ('/add-item', async(req, res) => {

    //dessa forma eu recupero os dados do usuario logado!!
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await auth.decodeToken(token);
    
    if(req.params.userId != data.id) return res.send(response.unauthorized('Acesso não autorizado!'));
    
    try {
        //cria o item
        var newThing = await thingService.post(req.body, req.params.userId);
        
        //adiciona na lista de emprestados (returned)
        userService.addItemInBorrewed(req.params.userId, newThing._id, (response) => {
            res.status(response.status).send(response);
        });
        
    } catch (error) {
        res.send(response.notFound('Erro ao salvar! Usuário não Existe.'));
    }
});

//o item foi devolvido (Devolucao - retornado)
exports.returnedItem = ('/returned', async(req, res) => {

    //dessa forma eu recupero os dados do usuario logado!!
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await auth.decodeToken(token);
    
    if(req.params.userId != data.id) return res.send(response.unauthorized('Acesso não autorizado!'));

    try {
        
        //busco o item pelo id
        await thingService.getItemById(req.params.itemId, async (result) => {
    

            if(!result) return res.send(response.notFound('Item não existe!'));

            // //remove dos emprestados (borrewed)
            await userService.removeItemInBorrewed(req.params.userId, response._id, (response) => {
                console.log(response);
            });
    
        //  adicionar na lista de devolvidos (returned)
            await userService.addItemInReturned(req.params.userId, response._id, (response) => {
                res.send(response)
            });
    
        });
            
    } catch (error) {
        res.send("Objeto Não encontrado!");
    }
});

//item removido da lista de devolvidos e do bd
exports.removeItem = ('/remove-item', async(req, res) => {

    //dessa forma eu recupero os dados do usuario logado!!
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await auth.decodeToken(token);
    
    if(req.params.userId != data.id) return res.send(response.unauthorized('Acesso não autorizado!'));
    
    try {
        await userService.removeItemInReturned(req.params.userId, req.params.itemId, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.send('Usuário não encontrado!');
    }
    
});

//solicitar o objeto emprestado - envio do email assim que acionado
exports.solicitedItem = ('/request-item', async(req, res) => {

    //dessa forma eu recupero os dados do usuario logado!!
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await auth.decodeToken(token);
    
    if(req.params.userId != data.id) return res.send(response.unauthorized('Acesso não autorizado!'));

    await thingService.getItemById(req.params.itemId, async (result) => {
        
        if(!result) return res.send(response.notFound('Item não existe!'));

        //nome do proprietario do item
        var owner_name = await User.findById(req.params.userId, 'firstName secondName');
        owner_name = owner_name.firstName + " " + owner_name.secondName;
        //para quem vai enviar
        var to = response.user_adress.email;
        //nome do recebedor do email
        var receiver = response.user_adress.name;
        //data de devolucao
        var loan_date = response.loan_date.getDate() + "/" + response.loan_date.getMonth() + "/" + response.loan_date.getFullYear();
        //descricao do item
        var describe_item = response.name
        
        await sendEmail(to, receiver, loan_date, describe_item, owner_name);
        
        res.send('Email enviado!');
    });
});

exports.removeUser = ('/remove-user', async (req, res) => {
    
    //dessa forma eu recupero os dados do usuario logado!!
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await auth.decodeToken(token);
    
    if(req.params.userId != data.id) return res.send(response.unauthorized('Acesso não autorizado!'));
    
    userService.removeUser(req.params.userId, (response) => {
        res.status(response.status).send(response);
    });


});

const sendEmail = (to, receiver, loan_date, describe_item, owner_name) => {
    var mailOptions = emailService.createMailOptions(to, receiver, loan_date, describe_item, owner_name);
    return emailService.send(mailOptions);
};

