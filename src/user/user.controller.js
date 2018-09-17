const mongoose = require("mongoose");
const User = mongoose.model('User');

exports.post = ('/', async (req, res, next) => {
    const user = new User(req.body);
    await user.save().then(() => {
        res.status(200).send('Usuario Salvo!');
    }).catch((err) => {
        res.send(err);
    });;
});

exports.get = ('/:id', async (req, res, next) => {
    User.findById(req.params.id).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.send('Usuario não encontrado!');
    });
});
