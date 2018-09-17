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
        // required: [true, 'Data de emprestimo é obrigatória'],
        default: Date.now

    },

    return_date: {
        type: Date,
        // required: [true, 'Data de emprestimo é obrigatória'],
        default: Date.now
    },

    obs: {
        type: String,
        trim: true,
        default: 'Observações não informada'
    },

    // informações do usuario.
    user_adress: {
            name: {
                type: String,
                required: [true, 'Nome é Obrigatório']
            },

            email: {
                type: String,
                default: 'Email não informado'
            },

            phone: {
                type: String,
                required: [true, 'Telefone é Obrigatório']
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