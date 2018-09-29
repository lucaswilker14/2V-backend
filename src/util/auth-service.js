const jwt = require('jsonwebtoken');
const response = require('../util/responses');


exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.send(response.unauthorized('Acesso Restrito!'));
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.json(response.unauthorized('Token Inválido!'));
            } else {
                next();
            }
        });
    }
};