const mongoose = require("mongoose");
const User = mongoose.model('User');
const Thing = mongoose.model('Thing');
const auth = require('./../../util/auth-service');

describe('API User and Thing', () => {

    var token_user = "";
    var token_user2 = "";

    var user = {};
    var user2 = {};

    var item = {
        "name": "Caneta BIC",
        "loan_date": "09/23/2018",
        "return_date": "10/08/2018",
        "user_adress": {
            "name": "Fulano",
            "email": "fuladi@gmail.com",
            "phone": "99887-5361",
            "state": "PB",
            "city": "CG"
        }
    }

    //criando um usuario com id para usar como token
    before((done) => {
        user = new User({
            "_id": new mongoose.mongo.ObjectId('56cb91bdc3499f14678934ca'),
            "firstName": "User",
            "secondName": "WITH ID",
            "email": "userwid@gmail.com",
            "username": "userwid1234",
            "password": "userwid1334",
            "phone": "99999-5500"
        });
        user.save();

        user2 = new User({
            "_id": new mongoose.mongo.ObjectId('14cb91bdc3499f14678934de'),
            "firstName": "User2",
            "secondName": "WITH ID",
            "email": "userwid2@gmail.com",
            "username": "userwid21234",
            "password": "userwid21334",
            "phone": "99999-5522"
        });
        user2.save();

        done();
    });

    //gerar token antes de cada teste
    beforeEach((done) => {
        
        auth.generateToken({
            id: user._id,
            email: user.email,
            username: user.username,
            role: user._type
        }).then((res) =>{
            token_user = res;
        });

        auth.generateToken({
            id: user2._id,
            email: user2.email,
            username: user2.username,
            role: user2._type
        }).then((res) =>{
            token_user2 = res;
        });

        done();
    });

    // //excluindo o usuario do bd
    after((done) => {
        User.findOneAndRemove({username: user.username}).then((result) => {
        });
        User.findOneAndRemove({username: user2.username}).then((result) => {
        });
        Thing.findOneAndRemove({name: 'Caneta BIC'}).then((result) => {    
        });
        done();
    });

    describe('Router User and Thing - POST /user/userid', () => {
        
        it('should create new Item in system and added to he user', (done) => {
            request
            .post('/api/2V/user/' + user._id)
            .set("Content-type", 'application/json')
            .set('x-access-token', token_user)
            .send(item)
            .end(function(err, res) {
                expect(201).to.be.equal(res.body.status)
                expect('Item Adicionado! (Lista de Emprestados)').to.include(res.body.message);
                done();
            });
        });

        it('should blocked user access', (done) => {
            request
            .post('/api/2V/user/' + user._id)
            .set("Content-type", 'application/json')
            .set('x-access-token', '')
            .send(item)
            .end(function(err, res) {
                expect(401).to.be.equal(res.body.status)
                expect('Acesso Restrito!').to.be.equal(res.body.message);
                done();
            });
        });
    
        it('should throw token error', (done) => {
            request
            .post('/api/2V/user/' + user._id)
            .set("Content-type", 'application/json')
            .set('x-access-token', "token 65416s4adasffsnsdgiug")
            .send(item)
            .end(function(err, res) {
                expect(409).to.be.equal(res.body.status)
                expect('Token Inválido!').to.equal(res.body.message);
                done();
            });
        });

    });

    describe('Router User and Thing - GET /user/userId/items', () => {
        
        it('should get user items by ID in system', (done) => {
            request
            .get('/api/2V/user/' + user._id + '/items')
            .set("Content-type", 'application/json')
            .set('x-access-token', token_user)
            .end(function(err, res) {
                expect(200).to.be.equal(res.body.status)
                expect('Busca concluida').to.include(res.body.message);
                done();
            });
        });

        it('should throw the error 404 - NOT FOUND', (done) => {
            request
            .get('/api/2V/user/' + user2._id + '/items')
            .set("Content-type", 'application/json')
            .set('x-access-token', token_user2)
            .end(function(err, res) {
                expect(404).to.be.equal(res.body.status)
                expect('Nenhum Item Encontrado!').to.include(res.body.message);
                done();
            });
        });
    });
    
});