const userService = require('../user/user.service');
const thingService = require('../things/thing.service');
const mongoose = require("mongoose");
const emailService = require('../util/emailSender');
const User = mongoose.model('User');

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
    try {
        await userService.getById(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.status(response.status);
    }
});

//busca os itens emprestado pelo usuarios
exports.getItens = ('/itens', async (req, res) => {
    try {
        await userService.getItemByUser(req.params.userId, (response) => {
            res.status(response.status).send(response);
       }); 
    } catch (error) {
        res.status(response.status);
    }
});

//empresta um item
exports.addItem = ('/add-item', async(req, res) => {
    try {
        //cria o item
        var newThing = await thingService.post(req.body, req.params.id);
        
        //adiciona na lista de emprestados (returned)
        userService.addItemInBorrewed(req.params.id, newThing._id, (response) => {
            res.status(response.status).send(response);
        });

    } catch (error) {
        console.log('DEU RUIM');
        res.send(error.message);
    }
});

//o item foi devolvido (Devolucao - retornado)
exports.returnedItem = ('/returned', async(req, res) => {
    try {
        
        //busco o item pelo id
        await thingService.getItemById(req.params.itemId, async (response) => {

            // //remove dos emprestados (borrewed)
            await userService.removeItemInBorrewed(req.params.userId, response._id, (response) => {
                    console.log(response);
            });

            //adicionar na lista de devolvidos (returned)
            await userService.addItemInReturned(req.params.userId, response._id, (response) => {
                    res.status(200).send(response)
            });

        });
        
    } catch (error) {
        res.send("Objeto Não encontrado!");
    }
     
});

//item removido da lista de devolvidos e do bd
exports.removeItem = ('/remove-item', async(req, res) => {
    try {

        await userService.removeItemInReturned(req.params.userId, req.params.itemId, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.send(error);
    }
});

exports.solicitedItem = ('/request-item', async(req, res) => {

    await thingService.getItemById(req.params.itemId, async (response) => {

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

const sendEmail = (to, receiver, loan_date, describe_item, owner_name) => {
    var mailOptions = userService.createMailOptions(to, receiver, loan_date, describe_item, owner_name);
    return emailService.send(mailOptions);
};

