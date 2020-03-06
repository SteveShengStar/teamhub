const data = require('../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return await data.filters.getAll();
        })));
    }
};
