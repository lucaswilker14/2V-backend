const loginService = require('./login.service.js');
const auth = require('./../util/auth-service');
const response = require('../util/responses');

exports.authenticate = async (req, res, next) => {

    try {

        const user = await loginService.authenticate({
            username: req.body.username,
            password: req.body.password
        });

        if(!user) return res.send(response.notFound('Username or Password Invalid!'));

        const token = await auth.generateToken({
            id: user._id,
            email: user.email,
            username: user.username,
            role: user._type
        });

        var result = {
            token:  token,
            username: user.username,
            name: user.firstName + " " + user.secondName
        }

        return res.send(response.ok('Usuario Logado!', result));

    } catch (error) {
        res.send(response.internalError());
    }
}