var express = require('express');
var router = express.Router();
const loginController = require('./login.controller');

router.post('/login', loginController.authenticate)

module.exports = router;