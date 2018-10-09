const userRouter = require('../user/user.routes');
const thingRouter = require('./../things/thing.routes');
const adminRouter = require('./../admin/admin.routes');
const loginRouter = require('./../login/login.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../config/swagger-docs/swagger.json');

module.exports = (app) => {
    app.use('/api/2V/user', userRouter);
    app.use('/api/2V/thing', thingRouter);
    app.use('/api/2V/admin', adminRouter);
    app.use('/api/2V/login', loginRouter);

    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

}
