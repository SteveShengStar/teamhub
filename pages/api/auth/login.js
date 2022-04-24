const data = require('../../../backend/data/index');
const cookie = require('cookie');

export default async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        
        if (await data.util.checkIsEmptyBody(req.body)) {
            res.statusCode = 400;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                throw Error('body must be present in request.');
            })));
            return;
        }

        res.statusCode = 200;

        const result = await data.auth.login(req.body);  // NOTE: Sending token directly to backend to be stored on MongoDB.
        const {userData} = result;

        res.setHeader('Set-Cookie', cookie.serialize("token", userData.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(userData.tokenExpiry),
            path: '/'   // default path is current API url path.
        }));
        // Strip user token info
        userData.token = undefined;
        userData.tokenExpiry = undefined;
        
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return result;
        })));
    } else {
        res.statusCode = 404;
        res.end();
    }
};
