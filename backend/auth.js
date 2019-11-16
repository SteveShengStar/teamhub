const router = require('express').Router();
const data = require('./data/index.js');

router.post('/login', async (req, res, next) => {
    try {
        res.send(await data.util.resWrapper(async () => {
            return 'Log in with Google!';
        }));
    } catch (err) {
        next(err);
    }
});