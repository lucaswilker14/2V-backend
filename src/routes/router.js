const userRouter = require('../user/user.routes');
const thingRouter = require('./../things/thing.routes');

module.exports = (app) => {
    app.use('/api/2V/user', userRouter);
    app.use('/api/2V/thing', thingRouter);
    // app.use('/api/2V/user', adminRouter);
    
}

// //rotas para admin
// router.post('/admin', userController.setSystemDate);
// router.get('/admin', userController.getAllUser);

// module.exports = router;