import express from 'express';
import add from './add';
import update from './update';
import delete from './delete';

const router = express.Router();

router.use('/add', add);
router.use('/delete', delete);
router.use('/update', update);

export default router;