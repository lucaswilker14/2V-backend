const config = require('../config/config');
var sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(config.sendGridKey);


//envio do email
exports.send = async (mailOptions) => {
    sendgrid.send({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text
    });
}

//criacao das opcoes de email
exports.createMailOptions = (to, receiver, loan_date, describeItem, ownerName) => {

    let mailOptions = {
        from: "2VService@email.com",
        subject: "Solicitação de Devolução"
    }

    //para quem enviar
    mailOptions['to'] = to;
    mailOptions['receiver'] = receiver;
    mailOptions['loan_date'] = loan_date; 

    //descricao do item
    mailOptions['describeItem'] = describeItem;

    mailOptions['solicitor'] = ownerName;

    //corpo do email
    mailOptions.text = "Olá, " + mailOptions.receiver  + "\n\n\n" + mailOptions.solicitor + " solicita a devolução do item emprestado!" + "\n\n" 
                        + "Descrição: " + "\n" + " - " + mailOptions.describeItem + " - Data de emprestimo: " + mailOptions.loan_date;

    return mailOptions;

};
