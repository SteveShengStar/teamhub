const data = require('../../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return await data.members.updateMember({ _id: req.query.id }, req.body.data);
        })));
    }
};