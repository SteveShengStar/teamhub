const data = require('../../../backend/data/index');

module.exports = async (req, res) => {
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
            return await data.members.add(req.body);
        })));
    } else {
        res.statusCode = 404;
        res.end();
    }
};