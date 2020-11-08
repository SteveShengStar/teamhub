const data = require('../../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        const authStatus = await data.auth.checkSpecificUser(req.headers['authorization'], req.query.id, res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');

            if (!req.query.id) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('id URL param must be specified.');
                })));
            }
            if (await data.util.checkIsEmptyBody(req.body)) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('body must be present in request.');
                })));
            }
            if (!req.body.data) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('data field must be specified in body.');
                })));
            }
            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.members.updateMember({ _id: req.query.id }, req.body.data);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};