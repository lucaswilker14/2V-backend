var express = require('express');
var app = express();
var router = express.Router();

// var mongoose = require('mongoose');
//conexao BD
// mongoose.connect('mongodb://localhost:27017/2vdb');
// const user = require('./models/User');
//router
// var indexRouter = require('./routes/index');

const route = router.get('/', (req, res) => {
    res.send({
        message: 'DEU CERTO, PORRA'
    })
});


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', route);

module.exports = app;


// app.set('view engine', 'ejs');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/users', usersRouter);
