var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send({
        message: 'DEU CERTO, PORRA'
    })
});

module.exports = router;