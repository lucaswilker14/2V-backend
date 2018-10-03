var express = require('express');
var router = express.Router();
const thingController = require('./thing.controller');
const auth = require('./../util/auth-service');

// //rotas de things
router.post('/', auth.authorize, thingController.post);
router.get('/', auth.authorize, thingController.get);
// router.get('/:id/thing/:id', thingController.getItemById); //nao funciona

module.exports = router;