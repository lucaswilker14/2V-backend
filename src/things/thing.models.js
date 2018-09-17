const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Thing = new schema({

    name: {
        type: String,
        required: [true, 'Nome do Objeto é obrigatório']
    },

    color: {
        type: String,
        trim: true,
        default: ''
    },

    brand: {
        type: String,
        trim: true,
        default: ''
    },

    obs: {
        type: String,
        trim: true,
        default: ''
    },

    image: {        
        type: String,
        default: ''
    },

    loan_date: {
        type: Date,
        required: [true, 'Data de emprestimo é obrigatória']

    },

    return_date: {
        type: Date,
        required: [true, 'Data de emprestimo é obrigatória']
    },

    user_adress: {
            name: {
                type: String,
                required: [true, 'Nome é Obrigatório']
            },

            email: {
                type: String
            },

            phone: {
                type: String,
                required: [true, 'Telefone é Obrigatório']
            },
            
            street: {
                type: String,
                required: [true, 'Rua é obrigatório'],
                trim: true,
                default: 'Rua não informada'
            },
            
            number: {
                type: String,
                required: [true, 'Número da casa é obrigatório'],
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