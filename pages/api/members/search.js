const data = require('../../../backend/data/index.js');
const cookie = require('cookie');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyUser(`Bearer ${token}`, res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');

            if (await data.util.checkIsEmptyBody(req.body)) {
                res.statusCode = 400;
                res.end(
                    JSON.stringify(
                        await data.util.resWrapper(async () => {
                            throw Error('body must be present in request.');
                        })
                    )
                );
                return;
            }
            if (!req.body.options) {
                res.statusCode = 400;
                res.end(
                    JSON.stringify(
                        await data.util.resWrapper(async () => {
                            throw Error(
                                'options field must be specified in body.'
                            );
                        })
                    )
                );
                return;
            }
            res.statusCode = 200;
            res.end(
                JSON.stringify(
                    await data.util.resWrapper(async () => {
                        let fields = null;
                        if (req.body.fields) {
                            fields = {};
                            for (const field of req.body.fields) {
                                fields[field] = 1;
                            }
                        }
                        return await data.members.search(
                            req.body.options,
                            fields
                        );
                    })
                )
            );
        } else {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Bearer');
            res.end('Unauthorized user.');
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};
