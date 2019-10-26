const router = require('express').Router();
const data = require('./data/index.js')

router.get('/info', async (req, res) => {
    res.send(await data.members.getAll());
});

module.exports = router;
