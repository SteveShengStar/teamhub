const router = require('express').Router();
const data = require('./data/index.js');

router.get('/', async (req, res, next) => {
    try {
        res.send(await data.members.getAll());
    } catch (err) {
        next(err);
    }
});

router.get('/:id/info', async (req, res, next) => {
    try {
        res.send(await data.members.getMember(req.params.id));
    } catch (err) {
        next(err);
    }
});

router.post('/add', async (req, res, next) => {
    try {
        res.send(await data.members.addMember(req.body.data));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
