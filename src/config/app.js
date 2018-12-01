const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('../config/mongoose')();
const cors = require('cors')
const body_parser = require('body-parser');

//carregar os modelos
const user = require('../user/user.model');
const thing = require('../things/thing.model');
const admin = require('../admin/admin.model');


app.use(morgan("dev"));

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//usando rotas
const indexRoute = require('../routes/router')(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();  // sem o next, a chamada para aqui
});

module.exports = app;