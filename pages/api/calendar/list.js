const data = require('../../../backend/data/index.js');
const cookie = require('cookie');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyUser(token, res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            await data.calendar.listEvents(token);
        }
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({}));
    }
};
