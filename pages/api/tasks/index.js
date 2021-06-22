const express = require('express');
const add = require('./add');
const update = require('./update');
const delete = require('./delete');

const router = express.Router();

router.use('/add', add);
router.use('/delete', delete);
router.use('/update', update);

export default router;