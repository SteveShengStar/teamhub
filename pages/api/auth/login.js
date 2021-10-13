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

        const lRep = await data.auth.login(req.body);  // NOTE: Sending token directly to backend to be stored on MongoDB.

        const user = lRep[0];
        res.setHeader('Set-Cookie', cookie.serialize("token", user.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(user.tokenExpiry)
        }));    // TODO: How to check this worked?
        // Strip user token info:
        user.token = undefined;
        user.tokenExpiry = undefined;

        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return lRep;
        })));
    } else {
        res.statusCode = 404;
        res.end();
    }
};
