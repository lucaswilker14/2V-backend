const userService = require('../user/user.service');
const thingService = require('../things/thing.service');
const mongoose = require("mongoose");
const User = mongoose.model('User');

//salva usuario
exports.post = ('/', async (req, res) => {
    try {
        await userService.post(req.body, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.send(response.status);
    }
});

//busca pelo id
exports.getById = ('/:id', async (req, res) => {
    try {
        await userService.getById(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.status(response.status);
    }
});


//empresta um item
exports.addItem = ('/:id/add-item', async(req, res) => {
    try {
        var newThing = await thingService.post(req.body);
        console.log(newThing);
        userService.addItem(req.params.id, newThing._id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.status(response.status).send(error);
    }
});

//o item foi devolvido (Devolucao - retornado)
exports.returnedItem = ('/:userId/remove-item/:itemId', async(req, res) => {
    await userService.returnedItem(req.params.userId, req.params.itemId, (response) => {
        res.status(response.status).send(response);
    });
});

//busca os itens emprestado pelo usuarios
exports.getItem = ('/:userId/itens', async (req, res) => {
    try {
        await userService.getItemByUser(req.params.userId, (response) => {
            res.status(response.status).send(response);
       }); 
    } catch (error) {
        res.status(response.status);
    }
});
