const data = require('../../../backend/data/index');

export default async (req, res) => {
    if (req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return await data.members.add(req.body);
        })));
    }
};