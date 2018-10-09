let mongoose = require("mongoose");
const config = require('./config');

module.exports = function () {

    mongoose.connect(config.connectionDBHeroku);
    
    //para rodar local
    // mongoose.connect(config.connectionDB);
    
    mongoose.Promise = global.Promise;

    let db = mongoose.connection;

    db.on("connected", function() {
        console.log("Banco conectado");
    });

    db.on("disconnected", function() {
        console.log("Banco desconectado");
    });

    db.on("error", function(error) {
        console.log('Erro na conexão com o banco: ' + error);
    });
};

