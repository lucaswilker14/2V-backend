const express = require('express');
const app = express();
const mongoose = require('../config/mongoose')();

//carregar os modelos
const product = require('../user/user.model');

//carregando rotas
const indexRoute = require('../routes/router');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//usando rotas
app.use('/', indexRoute);
// app.use('/', create);

module.exports = app;