const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('../config/mongoose')();

//carregar os modelos
const user = require('../user/user.model');
const thing = require('../things/thing.model');
const admin = require('../admin/admin.model');


app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//usando rotas
const indexRoute = require('../routes/router')(app);

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();  // sem o next, a chamada para aqui
});

module.exports = app;