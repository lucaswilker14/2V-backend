var express = require('express');
var router = express.Router();
const userController = require('../user/user.controller');

router.post('/', userController.post);
router.get('/:id', userController.get)

module.exports = router;