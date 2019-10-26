const router = require('express').Router();

router.get('/info', (req, res) => {
    res.send('hello world!');
});

module.exports = router;
