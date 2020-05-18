const data = require('../../../backend/data/index');

export default async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        if (!req.body) {
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                throw Error('body must be present in request.');
            })));
        }
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            const res = await data.auth.login(req.body);
            return res;
        })));
    } else {
        res.statusCode = 404;
        res.end();
    }
};
