const data = require('../../../../backend/data/index.js');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        const userId = req.query.id;

        return res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return await data.members.getToken(userId);
        })));
    } else {
        res.statusCode = 404;
        res.end();
    }
};