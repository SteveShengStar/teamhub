import express from 'express';
import auth from './auth';
import members from './members';
import tasks from './tasks';
import filters from './filters';
import upload from './upload';

const router = express.Router();

router.use('/auth', auth);
router.use('/members', members);
router.use('/tasks', tasks);
router.use('/filters', filters);
router.use('/upload', upload);

export default router;
