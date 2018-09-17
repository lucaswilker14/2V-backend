const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = new schema({
    
    firstName: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true
    },

    secondName: {
        type: String,
        required: [true, 'Sobrenome é obrigatório'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    username: {
        type: String,
        required: [true, 'Obrigatório'],
        trim: true
    },

    phone: {
        type: String,
        required: [true, 'Telefone é obrigatório'],
        trim: true

    },

    borrewed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],

    returned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }]

});

module.exports = mongoose.model('User', user);