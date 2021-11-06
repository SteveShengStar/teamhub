const data = require('../../../backend/data/index.js');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');

            const token = req.headers['authorization'].split(' ')[1];
            res.statusCode = 200;
            await data.calendar.listEvents(token);
        } else {
            res.statusCode = 401;
        }
        res.end(JSON.stringify({}));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({}));
    }
};