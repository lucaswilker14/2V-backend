var express = require('express');
var router = express.Router();
const userController = require('./user.controller');

//rotas de usuarios
router.post('/', userController.post);
 
router.get('/:id', userController.getById); 

router.get('/:userId/itens', userController.getItens); 

router.post('/:id', userController.addItem); 

router.put('/:userId/item/:itemId', userController.returnedItem); 

router.get('/:userId/item/:itemId', userController.solicitedItem); //quando clicar no botão C -FRONT

router.delete('/:userId/item/:itemId', userController.removeItem);

module.exports = router;