var express = require('express');
var router = express.Router();
const userController = require('../user/user.controller');
const thingController = require('../things/thing.controller');

//rotas de usuarios
router.post('/user', userController.post);

router.get('/user/:id', userController.getById);

router.get('/:userId/itens', userController.getItens);

router.post('/user/:id/add-item', userController.addItem);

router.put('/user/:userId/item/:itemId/devolve', userController.returnedItem);

router.delete('/user/:userId/remove-item/:itemId', userController.removeItem);

//rotas de things
router.post('/thing', thingController.post);
router.get('/user/:id/thing/:id', thingController.getItemById);

module.exports = router;