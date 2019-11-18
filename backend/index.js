const router = require('express').Router();
const data = require('./data/index');

data.init();

router.use('/members', require('./members'));
router.use('/teams', require('./teams'));
router.use('/auth', require('./auth'));

module.exports = router;
