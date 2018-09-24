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
        var newThing = await thingService.post(req.body);
        
        //adiciona na lista de emprestados (returned)
        userService.addItemInBorrewed(req.params.id, newThing._id, (response) => {
            res.status(response.status).send(response);
        });

    } catch (error) {
        console.log('DEU RUIM');
        res.status(response.status).send(error.message);
    }
});

//o item foi devolvido (Devolucao - retornado)
exports.returnedItem = ('/devolucao', async(req, res) => {
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
exports.removeItem = ('/removeItem', async(req, res) => {
    try {

        await userService.removeItemInReturned(req.params.userId, req.params.itemId, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.send(error);
    }
});

exports.solicitedItem = ('/solicitedItem', async(req, res) => {

    let mailOptions = {
        from: "2VService@email.com",
        subject: "Solicitação de Devolução"
    }
    
    await thingService.getItemById(req.params.itemId, async (response) => {

        //para quem enviar
        mailOptions['to'] = response.user_adress.email;
        mailOptions['receiver'] = response.user_adress.name;
        mailOptions['return_date'] = response.return_date.getDate() + "/" + response.return_date.getMonth() + "/" + response.return_date.getFullYear(); 

        //descricao do item
        mailOptions['describeItem'] = response.name;

        await userService.getById(req.params.userId, (response) => {
            //nome do solicitador
            mailOptions['solicitor'] = response.data.firstName + " " + response.data.secondName;
        });

        //corpo do email
        mailOptions.text = "Caro, " + mailOptions.receiver  + "\n\n\n" + mailOptions.solicitor + " solicita o item emprestado de volta!" + "\n\n" 
                            + "Descrição: " + "\n" + " - " + mailOptions.describeItem + " - Data de emprestimo: " + mailOptions.return_date;

        emailService.send(mailOptions);
        res.status(200).send('E-mail enviado!');
    });


});

