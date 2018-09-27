const express = require('express');
const app = express();
const mongoose = require('../config/mongoose')();

//carregar os modelos
const user = require('../user/user.model');
const thing = require('../things/thing.model');
const admin = require('../admin/admin.model');

//carregando rotas

// app.use(morgan("dev"));
// app.get('/api/2v', indexRoute);

// app.use('/api/2V', indexRoute);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//usando rotas
const indexRoute = require('../routes/router')(app);

app.get('/aaa', function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();  // sem o next, a chamada para aqui
});

module.exports = app;