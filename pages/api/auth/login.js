const data = require('../../../backend/data/index');

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
        const [userProfile, redirectUrl] = await data.auth.login(req.body);
        // res.setHeader('Location', redirectUrl);
        console.log("userProfile");
        console.log(userProfile);
        console.log("redirectUrl");
        console.log(redirectUrl);
        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return {user: userProfile, redirectUrl: redirectUrl}
        })));       // redirect user to oauth consent screen, which requests permission for Team Hub to access user's Google account data
    } else {
        res.statusCode = 404;
        res.end();
    }
};
