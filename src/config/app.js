const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('../config/mongoose')();
const cors = require('cors')

//carregar os modelos
const user = require('../user/user.model');
const thing = require('../things/thing.model');
const admin = require('../admin/admin.model');

//carregando rotas

app.use(morgan("tiny"));
// app.get('/api/2v', indexRoute);

// app.use('/api/2V', indexRoute);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//usando rotas
const indexRoute = require('../routes/router')(app);

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();  // sem o next, a chamada para aqui
});

module.exports = app;