import express from 'express';
import { members } from './api/members'

export const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('TeamHub Backend API.');
});

router.use('/members', members);

