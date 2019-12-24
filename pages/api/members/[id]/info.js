const data = require('../../../../backend/data/index');

export default async (req, res) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return await data.members.search({ _id: req.query.id });
        })));
    }
};