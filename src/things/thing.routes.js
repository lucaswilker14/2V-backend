var express = require('express');
var router = express.Router();
const thingController = require('./thing.controller');

// //rotas de things
router.post('/', thingController.post);
router.get('/', thingController.get);
// router.get('/:id/thing/:id', thingController.getItemById); //nao funciona

module.exports = router;