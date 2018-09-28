const loginService = require('./login.service.js');
const md5 = require('md5');
const auth = require('./../util/auth-service');
const response = require('../util/responses');

exports.post = async (req, res, next) => {
    try {
        const user = await loginService.authenticate({
            username: req.body.username,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!user) res.send(response.notFound('Username or Password Invalid!'));

        const token = await auth.generateToken({
            id: user._id,
            email: user.email,
            username: user.username
        });

        var result = {
            token:  token,
            username: user.username
        }



        res.send(response.ok('Usuario Logado!', result));

    } catch (error) {
        res.send(response.internalError());
    }
}