const router = require('express').Router();

router.use('/members', require('./members'));
router.use('/teams', require('./teams'));

module.exports = router;
