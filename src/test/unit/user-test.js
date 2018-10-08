const mongoose = require("mongoose");
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const auth = require('./../../util/auth-service');

describe('API User Test', () => {

    var user_with_id = {};

    //usuario completo
    var user_ex = {
        "firstName": "User",
        "secondName": "Name               ",
        "email": "user@gmail.com",
        "username": "user123",
        "password": "user133",
        "phone": "99999-9999"
    }

    //usuario nao possue secondName
    var user_ex_err = {
        "firstName": "User 2",
        "email": "user2@gmail.com",
        "username": "user1234",
        "password": "user1334",
        "phone": "99999-0000"
    }
    
    var token = "";

    //criando um usuario com id para usar como token
    before((done) => {
        user_with_id = new User({
        "_id": new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'),
        "firstName": "User",
        "secondName": "WITH ID",
        "email": "userwid@gmail.com",
        "username": "userwid1234",
        "password": "userwid1334",
        "phone": "99999-5500"
        });
        user_with_id.save();
        done();
    })
    
    //gerar token antes de cada teste
    beforeEach((done) => {
                    
        auth.generateToken({
            id: user_with_id._id,
            email: user_with_id.email,
            username: user_with_id.username,
            role: user_with_id._type
        }).then((res) =>{
            token = res;
        });
        done();
    });

    //excluindo o usuario do bd
    after((done) => {
        User.findOneAndRemove({username: user_ex.username}).then((result) => {
            done();
        });
    });

    describe('Router User - POST /user', () => {
        it('should create a new user', (done) => {
            request
            .post('/api/2V/user')
            .set("Content-type", 'application/json')
            .send(user_ex)
            .end(function(err, res) {
                expect(201).to.be.equal(res.body.status)
                expect('Usuário Criado com Sucesso!').to.equal(res.body.message);
                done();
            });
        });

        it('should not create a new user', (done) => {
            request
            .post('/api/2V/user')
            .set("Content-type", 'application/json')
            .send(user_ex_err)
            .end(function(err, res) {
                expect(400).to.be.equal(res.body.status);
                expect(res.body.message).to.include('Sobrenome é obrigatório');
                done();
            });
        });
        
    });
    
    describe('Router User - GET /user/:userId', () => {
        
        it('should return user by id', (done) => {
            request
            .get('/api/2V/user/' + user_with_id._id)
            .set("Content-type", 'application/json')
            .set("x-access-token", token)
            .end(function(err, res) {
                expect(200).to.be.equal(res.body.status)
                expect('Busca concluída com Sucesso').to.equal(res.body.message);
                done();
            });
        });

        it('should throw token error', (done) => {
            request
            .get('/api/2V/user/' + user_with_id._id)
            .set("Content-type", 'application/json')
            .set("x-access-token", "token 11454897845154asasasc4xc564")
            .end(function(err, res) {
                expect(409).to.be.equal(res.body.status)
                expect('Token Inválido!').to.equal(res.body.message);
                done();
            });
        });

        it('should throw restricted access error', (done) => {
            request
            .get('/api/2V/user/' + user_ex._id)
            .set("Content-type", 'application/json')
            .set("x-access-token", token)
            .end(function(err, res) {
                expect(401).to.be.equal(res.body.status)
                expect('Acesso não autorizado! Ids diferentes').to.equal(res.body.message);
                done();
            });
        });
        
    });

    describe('Router User - DELETE /user/:userId', () => {

        it('should delete a user', (done) => {
            request
            .delete('/api/2V/user/' + user_with_id._id)
            .set("Content-type", 'application/json')
            .set("x-access-token", token)
            .send(user_with_id)
            .end(function(err, res) {
                expect(200).to.be.equal(res.body.status)
                expect('Sua conta foi excluida!').to.equal(res.body.message);
                done();
            });
        });

        
        it('should throw token error - delete user', (done) => {
            request
            .get('/api/2V/user/' + user_with_id._id)
            .set("Content-type", 'application/json')
            .set("x-access-token", "token 11454897845154asasasc4xc564")
            .end(function(err, res) {
                expect(409).to.be.equal(res.body.status)
                expect('Token Inválido!').to.equal(res.body.message);
                done();
            });
        });


        it('should throw restricted access error - delete user', (done) => {
            request
            .get('/api/2V/user/' + user_ex._id)
            .set("Content-type", 'application/json')
            .set("x-access-token", token)
            .end(function(err, res) {
                expect(401).to.be.equal(res.body.status)
                expect('Acesso não autorizado! Ids diferentes').to.equal(res.body.message);
                done();
            });
        });

    });
    

});

describe('API Admin Test', () => {

    var admin_with_id = {};

    //usuario completo
    let admin_ex = {
        "firstName": "Admin",
        "secondName": "Name               ",
        "email": "admin@gmail.com",
        "username": "admin123",
        "password": "admin123",
        "phone": "99999-0101"
    }

    //usuario nao possue secondName
    let admin_ex_err = {
        "firstName": "Admin 2",
        "email": "admin2@gmail.com",
        "username": "admin1234",
        "password": "admin1234",
        "phone": "99999-0202"
    }

    var token = "";

    var systemDate = {
        "hour" : 17,
        "minute" : 15
    }

    //criando um usuario com id para usar como token
    before((done) => {
        admin_with_id = new Admin({
            "_id": new mongoose.mongo.ObjectId('56cb91bdc3464f14678554ca'),
            "firstName": "Admin",
            "secondName": "WITH ID",
            "email": "adminwid@gmail.com",
            "username": "adminwid1234",
            "password": "adminwid1334",
            "phone": "99999-0066"
        });
        admin_with_id.save();
        done();
    })

    //gerar token antes de cada teste
    beforeEach((done) => {
        auth.generateToken({
            id: admin_with_id._id,
            email: admin_with_id.email,
            username: admin_with_id.username,
            role: admin_with_id._type
        }).then((res) =>{
            token = res;
        });
        done();
    });

    after((done) => {
        Admin.findOneAndRemove({username: "adminwid1234"}).then((result) => {
        })
        
        Admin.findOneAndRemove({username: "admin123"}).then((result) => {
        })
        done();
    });

    describe('Router Admin - POST /admin/unique', () => {

        it('should create a new admin', (done) => {
            request
            .post('/api/2V/admin/unique')
            .set("Content-type", 'application/json')
            .send(admin_ex)
            .end(function(err, res) {
                expect(201).to.be.equal(res.body.status)
                expect('Admin Criado com Sucesso!').to.equal(res.body.message);
                done();
            });
        });

        it('should not create a new admin', (done) => {
            request
            .post('/api/2V/admin/unique')
            .set("Content-type", 'application/json')
            .send(admin_ex_err)
            .end(function(err, res) {
                expect(400).to.be.equal(res.body.status);
                expect(res.body.message).to.include('Sobrenome é obrigatório');
                done();
            });
        });

    });


    describe('Router Admin - PUT /admin/systemDate', () => {
        
        it('should update the system time for sending emails', (done) => {
            request
            .put('/api/2V/admin/systemDate')
            .set("Content-type", 'application/json')
            .set("x-access-token", token)
            .send(systemDate)
            .end(function(err, res) {
                expect(200).to.be.equal(res.status);
                expect(res.text).to.include('Horário do envio de emails de devolução alterado para as:');
                done();
            });
        });

    });

    
});
