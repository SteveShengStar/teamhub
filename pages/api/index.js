const express = require('express');
const auth = require('./auth');
const members = require('./members');
const tasks = require('./tasks');
const filters = require('./filters');

const router = express.Router();

router.use('/auth', auth);
router.use('/members', members);
router.use('/tasks', tasks);
router.use('/filters', filters);