const data = require('../../../../backend/data/index');
const cookie = require('cookie');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        // const authStatus = await data.auth.checkSpecificUser(`Bearer ${token}`, req.query.id, res);
        if (true) {
            res.setHeader('Content-Type', 'application/json');

            if (!req.query.id) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('id URL param must be specified.');
                })));
                return;
            }
            if (await data.util.checkIsEmptyBody(req.body)) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('body must be present in request.');
                })));
                return;
            }
            if (!req.body.data) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('data field must be specified in body.');
                })));
                return;
            }

            res.statusCode = 200;
            const payload = req.body.data;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.members.updateMember({ _id: req.query.id }, payload);
            })));
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