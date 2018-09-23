const thingService = require('../things/thing.service');

exports.post = ('/', async (req, res) => {
    await thingService.post(req.body, (response) => {
        res.status(200).send(response);
    });
});

exports.get = ('/', async (req, res) => {
    await thingService.get((response) => {
        res.status(200).send(response);
    });
});

exports.getItemById = ('/', async (req, res) => {
    await thingService.getItemById(req.params.id, (response) => {
        res.status(200).send(response);
    });
});

