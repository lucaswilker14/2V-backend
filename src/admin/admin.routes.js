var express = require('express');
var router = express.Router();
const adminController = require('./admin.controller');
const auth = require('./../util/auth-service');


router.post('/', auth.isAdmin, auth.authorize, adminController.post);
router.post('/unique', adminController.post);
router.put('/systemdate', auth.isAdmin, auth.authorize, adminController.setSystemDate);
router.get('/', auth.isAdmin, auth.authorize, adminController.getAllUser);

module.exports = router;