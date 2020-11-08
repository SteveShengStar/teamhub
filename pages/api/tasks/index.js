const data = require('../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    
    if (req.method === 'GET') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.task.get(req.body.id);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};