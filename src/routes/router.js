const userRouter = require('../user/user.routes');
const thingRouter = require('./../things/thing.routes');
const adminRouter = require('./../admin/admin.routes');
const loginRouter = require('./../login/login.routes');

module.exports = (app) => {
    app.use('/api/2V/user', userRouter);
    app.use('/api/2V/thing', thingRouter);
    app.use('/api/2V/admin', adminRouter);
    app.use('/api/2V/', loginRouter);
}
