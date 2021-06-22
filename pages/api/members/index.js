const express = require('express');
const getAll = require('./getAll');
const add = require('./add');
const search = require('./search');
const email = require('./[id]/email');
const info = require('./[id]/info');
const remove = require('./[id]/remove');
const tasks = require('./[id]/tasks');
const token = require('./[id]/token');
const update = require('./[id]/update');
const updateTaskStatus = require('./[id]/updateTaskStatus');

const router = express.Router();

router.use('/', getAll);
router.use('/add', add);
router.use('/search', search);
router.use('/:id/email', email);
router.use('/:id/info', info);
router.use('/:id/remove', remove);
router.use('/:id/tasks', tasks);
router.use('/:id/token', token);
router.use('/:id/update', update);
router.use('/:id/updateTaskStatus', updateTaskStatus);

export default router;