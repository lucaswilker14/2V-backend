const mongoose = require("mongoose");
const schema = mongoose.Schema;

const validateEmail = (email) => {
    var x = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return x.test(email);
}

const validatePhone = (phone) => {
    return new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).test(phone);
}

const validadeDate = (date) => {
    return new RegExp(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
}

const Thing = new schema({

    name: {
        type: String,
        required: [true, 'Nome do Objeto é obrigatório'],
        trim: true
    },

    color: {
        type: String,
        trim: true,
        default: 'Cor não informada'
    },

    brand: {
        type: String,
        trim: true,
        default: 'Marca não informada'
    },

    image: {        
        type: String,
        default: 'Imagem não informada'
    },

    loan_date: {
        type: Date,
        validate: [validadeDate, 'Data Inválida'],
        required: [true, 'Data de emprestimo é obrigatória']
        // default: Date.now

    },

    return_date: {
        type: Date,
        validate: [validadeDate, 'Data Inválida'],
        required: [true, 'Data de emprestimo é obrigatória']
        // default: Date.now
    },

    obs: {
        type: String,
        trim: true,
        default: 'Observações não informada'
    },

    owner: {
        default: null,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // informações do usuario.
    user_adress: {
            name: {
                type: String,
                trim: true,
                required: [true, 'Nome é Obrigatório']
            },

            email: {
                type: String,
                default: 'Email não informado',
                validate: [validateEmail, 'E-mail invalido!'],
                trim: true
            },

            phone: {
                type: String,
                required: [true, 'Telefone é Obrigatório'],
                trim: true,
                validate: [validatePhone, 'Telefone Inválido']
            },
            
            street: {
                type: String,
                trim: true,
                default: 'Rua não informada'
            },
            
            number: {
                type: String,
                trim: true,
                default: 'Número não informada'
            },
    
            neighborhood: {
                type: String,
                trim: true,
                default: 'Bairro não informada'
            },
    
            cep: {
                type: String,
                trim: true,
                default: 'CEP não informada'
            },
    
            state: {
                type: String,
                required: [true, 'Estado é obrigatório'],
                trim: true,
                default: 'Estado não informada'
            },
    
            city: {
                type: String,
                required: [true, 'Cidade é obrigatório'],
                trim: true,
                default: 'Cidade não informada'
            },
    }
});

module.exports = mongoose.model('Thing', Thing);