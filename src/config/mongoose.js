let mongoose = require("mongoose");

module.exports = function () {
    mongoose.connect("mongodb://localhost:27017/2vdb");
    mongoose.Promise = global.Promise;

    let db = mongoose.connection;

    db.on("connected", function() {
        console.log("Banco conectado");
    });

    db.on("disconnected", function() {
        console.log("desconectado");
    });

    db.on("error", function(error) {
        console.log('Erro na conexão: ' + error);
    });
};

