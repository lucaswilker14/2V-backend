var express = require('express');
var router = express.Router();
const adminController = require('./admin.controller');
const auth = require('./../util/auth-service');


// //rotas para admin

router.post('/', auth.authorize, adminController.post);
router.post('/systemDate', auth.authorize, adminController.setSystemDate);
router.get('/', auth.authorize, adminController.getAllUser);

module.exports = router;