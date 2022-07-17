const data = require('../../../../backend/data/index');
const cookie = require('cookie');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyUser(`Bearer ${token}`, res);
                            
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            
            const {formName} = req.query;
            if (!formName) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('Missing Required Paramter: formName must be specified in the query.');
                })));
                return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.googlesheets.writefile(token, formName);
            })));
        } else {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Bearer');
            res.end('Unauthorized user.');
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};