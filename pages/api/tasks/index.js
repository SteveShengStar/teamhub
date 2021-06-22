const express = require('express');
const add = require('./add');
const update = require('./update');
const del = require('./delete');

const router = express.Router();

router.use('/add', add);
router.use('/delete', del);
router.use('/update', update);