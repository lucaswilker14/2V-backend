const userService = require('../user/user.service');
const thingService = require('../things/thing.service');
const mongoose = require("mongoose");
const User = mongoose.model('User');

//salva usuario
exports.post = ('/', async (req, res) => {
    try {
        await userService.post(req.body, (callback) => {
            res.status(200).send(callback);
        });
    } catch (error) {
        res.send(error);
    }
});

//busca pelo id
exports.getById = ('/:id', async (req, res) => {
    try {
        await userService.getById(req.params.id, (response) => {
            res.status(200).send(response);
        });
    } catch (error) {
        res.status(400);
    }
});


//empresta um item
exports.addItem = ('/:id/add-item', async(req, res) => {
    try {
        var newThing = await thingService.post(req.body);
        console.log(newThing);
        userService.addItem(req.params.id, newThing._id, (response) => {
            res.status(200).send(response);
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

//o item foi devolvido (Devolucao - retornado)
exports.returnedItem = ('/:userId/remove-item/:itemId', async(req, res) => {
    await userService.returnedItem(req.params.userId, req.params.itemId, (response) => {
        res.status(200).send(response);
    });
});

//busca os itens emprestado pelo usuarios
exports.getItem = ('/:userId/itens', async (req, res) => {
    try {
        await userService.getItemByUser(req.params.userId, (response) => {
            res.status(200).send(response);
       }); 
    } catch (error) {
        res.status(400);
    }
});
