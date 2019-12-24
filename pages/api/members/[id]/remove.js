const data = require('../../../../backend/data/index');

module.exports = async (req, res) => {
    if (req.method === 'DELETE') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return await data.members.delete({ _id: req.query.id });
        })));
    }
};