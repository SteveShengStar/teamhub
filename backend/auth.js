const router = require('express').Router();
const data = require('./data/index.js');

router.post('/login', async (req, res, next) => {
    try {
        res.send(await data.util.resWrapper(async () => {
            const res = await data.auth.login(req.body);
            console.log(res);
            return res;
        }));
    } catch (err) {
        next(err);
    }
});

module.exports = router;