var express = require('express');
var router = express.Router();
const userController = require('./user.controller');
const auth = require('./../util/auth-service');

//rotas de usuarios
router.post('/', userController.post);

router.post('/:userId', auth.authorize, userController.addItem);
 
router.get('/:userId', auth.authorize, userController.getById);

router.delete('/:userId', auth.authorize, userController.removeUser);

router.get('/:userId/items', auth.authorize, userController.getItems);

router.put('/:userId/item/:itemId', auth.authorize, userController.returnedItem);

router.delete('/:userId/item/:itemId', auth.authorize, userController.removeItem);

router.get('/:userId/item/:itemId', auth.authorize, userController.solicitedItem); //quando clicar no botão C -FRONT


module.exports = router;