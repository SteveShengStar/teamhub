const data = require('../../../backend/data/index.js');
const cookie = require('cookie');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyUser(`Bearer ${token}`, res); 
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;

            const eventDetails = req.body;
            return res.end(JSON.stringify(await data.util.resWrapper(async () => {
                // Call the function which updates a Google Calendar Event.
                return await data.calendar.update(token, eventDetails, res);
            })));
        } else {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Bearer');
            res.end('Unauthorized user.');
        }
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({}));
    }
};