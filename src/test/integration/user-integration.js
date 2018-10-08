describe('Router User - POST /user:id', () => {
    
    var token = "";

    var item = {
        "name": "Caneta BIC",
        "loan_date": "09/23/2018",
        "return_date": "10/07/2018",
        "user_adress": {
            "name": "Fulano",
            "email": "fuladi@gmail.com",
            "phone": "99887-5361",
            "state": "PB",
            "city": "CG"
        }
    }

    var user2 = new User({
        "_id": mongoose.Types.ObjectId('111111111111111111111111'),
        "firstName": "User2",
        "secondName": "Name2               ",
        "email": "user2@gmail.com",
        "username": "user1234",
        "password": "user1234",
        "phone": "99999-1111"
    });
    user2.save();

    auth.generateToken({
        id: user2._id,
        email: user2.email,
        username: user2.username,
        role: user2._type
    }).then((res) => {
        token = res;
    });


    it('should create new Item in system and added to he user', (done) => {
        request
        .post('/api/2V/user/' + user2._id)
        .set("Content-type", 'application/json')
        .set('x-access-token', token)
        .send(item)
        .end(function(err, res) {
            expect(201).to.be.equal(res.body.status)
            // expect('Usuário Criado com Sucesso!').to.equal(res.body.message);
            done();
        });
    });

});