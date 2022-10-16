const data = require('../../../backend/data/index');
const cookie = require('cookie');

export default async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'GET' || req.method === 'POST') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyUser(token, res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(authStatus));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};
