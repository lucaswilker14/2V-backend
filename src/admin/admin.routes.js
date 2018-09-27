var express = require('express');
var router = express.Router();
const adminController = require('./admin.controller');

// //rotas para admin

router.post('/', adminController.post);
router.post('/systemDate', adminController.setSystemDate);
router.get('/', adminController.getAllUser);

module.exports = router;