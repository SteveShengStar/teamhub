import express from 'express';
import check from './check';
import login from './login';
import redirect from './redirect';

const router = express.Router();

router.use('/check', check); // GET or POST
router.get('/redirect', redirect);
router.post('/login', login);

export default router;