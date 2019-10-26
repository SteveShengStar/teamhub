const router = require('express').Router();
const data = require('./data/index.js')

router.get('/info', (req, res) => {
    res.send(data.members.getAll());
});

module.exports = router;
