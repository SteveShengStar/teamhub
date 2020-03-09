const data = require('../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                let fields = null;
                if (req.body.fields) {
                    fields = {};
                    for (const field of req.body.fields) {
                        fields[field] = 1;
                    }
                }
                return await data.members.getAll(fields);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};