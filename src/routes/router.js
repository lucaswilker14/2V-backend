var express = require('express');
var router = express.Router();
const userController = require('../user/user.controller');
const thingController = require('../things/thing.controller');

//rotas de usuarios
router.post('/user', userController.post);
router.get('/user/:id', userController.getById);
router.get('/:userId/itens', userController.getItem);
router.post('/user/:id/add-item', userController.addItem);
router.put('/user/:userId/remove-item/:itemId', userController.returnedItem);

//rotas de things
router.post('/thing', thingController.post);
router.get('/thing/:id', thingController.get);

module.exports = router;