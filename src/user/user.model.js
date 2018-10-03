const mongoose = require("mongoose");
var md5 = require('md5');
const schema = mongoose.Schema;

const baseOptions = {
    discriminatorKey: '_type',
    collection: 'users'
};

const validateEmail = (email) => {
    var x = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return x.test(email);
}

const validatePhone = (phone) => {
    return new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).test(phone);
}

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
        unique: true,
        validate: [validateEmail, 'E-mail invalido!']
    },

    username: {
        type: String,
        required: [true, 'Obrigatório'],
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: [true, 'Telefone é obrigatório'],
        trim: true,
        validate: [validatePhone, 'Telefone Inválido']

    },

    borrewed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],

    returned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }]

}, baseOptions);

const User = mongoose.model('User', user);

user.pre('save', function(next) {
    // check if password is present and is modified.
    if ( this.password && this.isModified('password') ) {
        this.password = md5(this.password + global.SALT_KEY);
    }
    next();
});


module.exports = User;