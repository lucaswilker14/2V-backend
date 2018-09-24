var express = require('express');
var router = express.Router();
const userController = require('../user/user.controller');
const thingController = require('../things/thing.controller');


//rotas de usuarios
router.post('/user', userController.post);

router.get('/user/:id', userController.getById);

router.get('/user/:userId/itens', userController.getItens);

router.post('/user/:id', userController.addItem);

router.put('/user/:userId/item/:itemId', userController.returnedItem);

router.get('/user/:userId/item/:itemId', userController.solicitedItem); //quando clicar no botão C -FRONT

router.delete('/user/:userId/item/:itemId', userController.removeItem);

//rotas de things
router.post('/thing', thingController.post);
router.get('/user/:id/thing/:id', thingController.getItemById);

module.exports = router;