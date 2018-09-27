const adminService = require('./admin.service');
const config = require('../config/config');
const schedule = require('../util/schedule')(config.systemHour.hour, config.systemHour.minute);


//salva admin
exports.post = ('/create', async (req, res) => {
    try {
        await adminService.post(req.body, (response) => {
            res.status(response.status).send(response);
        });
    } catch (error) {
        res.send(error);
    }
});

//mudar o horario do envio de emails
exports.setSystemDate = ('/change', (req, res) => {
    var rule = adminService.createRule(req.body.hour, req.body.minute);
    console.log(rule);
    var x = schedule.reschedule(rule);
    if (x) res.status(200).send(rule.message);
    else res.status(200).send('error');
});

//buscar todos os usuarios!
exports.getAllUser = ('/getUsers', async (req, res) => {
    await adminService.getFindAll((response) => {
        res.send(response);
    });
});