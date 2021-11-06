const data = require('../../../backend/data/index');

export default async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            
            if (await data.util.checkIsEmptyBody(req.body)) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('body must be present in request.');
                })));
                return;
            }

            const {userId} = req.body;
            if (!userId) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('userId must be specified in the body.');
                })));
                return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                const res = await data.auth.logout(userId);
                return res;
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};