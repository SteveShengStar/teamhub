const data = require('../../../../backend/data/index');
const cookie = require('cookie');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'GET') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyAdminUser(token, res);

        if (authStatus) {
            const token = req.headers['authorization'].split(' ')[1];
            res.setHeader('Content-Type', 'application/json');

            res.statusCode = 200;

            res.end(
                JSON.stringify(
                    await data.util.resWrapper(async () => {
                        return await data.googlesheets.readfile(token);
                    })
                )
            );
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};
