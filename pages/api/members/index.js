const data = require('../../../backend/data/index');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
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
};