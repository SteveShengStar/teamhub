const data = require('../../../backend/data/index');

export default async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        
        if (data.util.checkIsEmptyBody(req.body)) {
            res.statusCode = 400;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                throw Error('body must be present in request.');
            })));
            return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            const res = await data.auth.login(req.body);
            return res;
        })));
    } else {
        res.statusCode = 404;
        res.end();
    }
};
