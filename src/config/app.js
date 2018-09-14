const express = require('express');
const app = express();

//carregando rotas
const indexRoute = require('../routes/index');


app.use(express.json());
app.use(express.urlencoded({extended: false}));


//usando rotas
app.use('/', indexRoute);
// app.use('/', create);

module.exports = app;