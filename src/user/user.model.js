const mongoose = require("mongoose");
var md5 = require('md5');
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
        unique: true
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

const User = mongoose.model('User', user);

user.pre('save', function(next) {
    // check if password is present and is modified.
    if ( this.password && this.isModified('password') ) {
        this.password = md5(this.password + global.SALT_KEY);
    }
    next();
});

user.pre('save', (next) => {

    var self = this;
    User.find({email : self.email}, (err, docs) => {
        if (!docs.length){
            console.log('user email exists: ', self.email);
            next(new Error("User email exists!"));
        }else {                
            next(new Error("User email exists!"));
        }

    });
});

module.exports = User;