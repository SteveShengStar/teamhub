const data = require('../../../../backend/data/index');
const cookie = require('cookie');

module.exports = async (req, res) => {
    await data.initIfNotStarted();

    if (req.method === 'POST') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyUser(token, res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');

            if (!req.query.id) {
                res.statusCode = 400;
                res.end(
                    JSON.stringify(
                        await data.util.resWrapper(async () => {
                            throw Error('URL params must contain user id.');
                        })
                    )
                );
                return;
            }

            const status =
                req.body && req.body.taskStatus ? req.body.taskStatus : null;

            res.statusCode = 200;
            res.end(
                JSON.stringify(
                    await data.util.resWrapper(async () => {
                        return await data.task.get(req.query.id, status);
                    })
                )
            );
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};
