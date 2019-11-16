const router = require('express').Router();
const data = require('./data/index');

router.data = data;
router.use('/members', require('./members'));
router.use('/teams', require('./teams'));

module.exports = router;
