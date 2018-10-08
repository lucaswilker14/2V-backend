const mongoose = require("mongoose");
const User = mongoose.model('User');

describe('API Login Test', () =>{

    var user = {};

    var credencials = {
        "username" : "user123",
        "password" : "user123"
    }

    var credencials_error = {
        "username" : "user124sdasd",
        "password" : "user124sadsad"
    }

    before((done) => {
        user = new User({
            "_id": new mongoose.mongo.ObjectId('56cb91bdc3499f14678934ca'),
            "firstName": "User",
            "secondName": "Name",
            "email": "user@gmail.com",
            "username": "user123",
            "password": "user123",
            "phone": "99999-5169"
            });
        user.save();
        done();
    });

    //excluindo o usuario do bd
    after((done) => {
        User.findOneAndRemove({username: user.username}).then((result) => {
            done();
        });
    });

    describe('Router User - POST /login', () => {
        it('should login user', (done) => {
            request
            .post('/api/2V/login')
            .set("Content-type", 'application/json')
            .send(credencials)
            .end(function(err, res) {
                expect(200).to.be.equal(res.body.status)
                expect('Usuario Logado!').to.equal(res.body.message);
                done();
            });
        });

        it('should not login user', (done) => {
            request
            .post('/api/2V/login')
            .set("Content-type", 'application/json')
            .send(credencials_error)
            .end(function(err, res) {
                expect(404).to.be.equal(res.body.status);
                expect(res.body.message).to.include('Username or Password Invalid!');
                done();
            });
        });
        
    });

});