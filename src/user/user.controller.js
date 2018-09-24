const userService = require('../user/user.service');
const thingService = require('../things/thing.service');
const mongoose = require("mongoose");
const emailService = require('../util/emailsender');
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

            var mailOptions = {
                from: "2Vservice@email.com",
                to: response.user_adress.email,
                subject: "Solicitação de Devolução",
                text: "Caro "+ response.user_adress.name + ", Thaynara solicita seu item de volta! \n\ SDHASD"
            }

            emailService.send(mailOptions);

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

