const data = require('../../../backend/data/index');

export default async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'GET' || req.method === 'POST') {
        const userPayload = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (userPayload) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(userPayload));
        }
        // TODO: handle the false case
    } else {
        res.statusCode = 404;
        res.end();
    }
};
