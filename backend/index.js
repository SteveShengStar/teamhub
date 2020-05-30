const express = require('express');
const router = express.Router();
const members = require('./api/members');

router.get('/', (req, res, next) => {
    res.status(200).send('TeamHub Backend API.');
});

router.use('/members', members);

module.exports = router;