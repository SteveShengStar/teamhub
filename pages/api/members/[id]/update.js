const data = require('../../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        const authStatus = await data.auth.checkSpecificUser(req.headers['authorization'], req.query.id, res);
        if (authStatus) {
            res.statusCode = 200;
            if (!req.query.id) {
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('id URL param must be specified.');
                })));
            }
            if (!req.body.data) {
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('data field must be specified in body.');
                })));
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.members.updateMember(req.query.id, req.body.data);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};