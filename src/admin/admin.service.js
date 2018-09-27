var mongoose = require('mongoose');
const response = require('../util/responses');
const Admin = mongoose.model('Admin');
const User = mongoose.model('User');
const schedule = require('node-schedule');


//save
exports.post = async (admin, callback) => {
    var admin = new Admin(admin); //criando um usuario
    await admin.save().then((result) => {
        callback(response.created('Admin Criado com Sucesso!', result));
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });
}

//criando regra para mudar a hora do sistema
exports.createRule = (hour, minute) => {
    var rule =  new schedule.RecurrenceRule();
    rule.hour = hour;
    rule.minute = minute;
    return {message: 'Horário do envio de emails de devolução alterado para as: ' + hour + ":" + minute + "h",
            rule: rule}
};

exports.getFindAll = async (callback) => {
    await User.find({}).then((result) => {
        callback(response.ok('Busca concluida', result));
    }).catch((err) => {
        callback(response.notFound(err));
    });
}