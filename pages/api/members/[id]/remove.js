const data = require('../../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'DELETE') {
        const authStatus = await data.auth.checkSpecificUser(req.headers['authorization'], req.query.id, res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.members.delete({ _id: req.query.id });
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};