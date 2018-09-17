const userService = require('../user/user.service');
const thingService = require('../things/thing.service');
const mongoose = require("mongoose");
const User = mongoose.model('User');

//salva usuario
exports.post = ('/', async (req, res) => {
    await userService.post(req.body, (response) => {
        res.status(200).send(response);
    });
});

//busca pelo id
exports.getById = ('/:id', async (req, res) => {
    await userService.getById(req.params.id, (response) => {
        res.status(200).send(response);
    });
});

//busca os itens emprestado pelo usuarios
exports.getItem = ('/:userId/itens', async (req, res) => {
    await userService.getItemByUser(req.params.userId, (response) => {
        res.status(200).send(response);
   }); 
});

//empresta um item
exports.addItem = ('/:id/add-item', async(req, res) => {
    await thingService.post(req.body, async (response) => {
       userService.addItem(req.params.id, response._id, (response) => {
           res.status(200).send(response);
       });
    });
});

//o item foi devolvido (Devolucao - retornado)
exports.returnedItem = ('/:userId/remove-item/:itemId', async(req, res) => {
    await userService.returnedItem(req.params.userId, req.params.itemId, (response) => {
        res.status(200).send(response);
    });
});

