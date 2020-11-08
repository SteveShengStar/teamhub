const data = require('../../../backend/data/index.js');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');

            if (data.util.checkIsEmptyBody(req.body)) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('body must be present in request.');
                })));
            }
            if (!req.body.options) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('options field must be specified in body.');
                })));
            }
            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                let fields = null;
                if (req.body.fields) {
                    fields = {};
                    for (const field of req.body.fields) {
                        fields[field] = 1;
                    }
                }
                return await data.members.search(req.body.options, fields);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};