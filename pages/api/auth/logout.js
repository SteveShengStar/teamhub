const data = require('../../../backend/data/index');
const cookie = require('cookie');

export default async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyUser(token, res, true);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');

            if (await data.util.checkIsEmptyBody(req.body)) {
                res.statusCode = 400;
                res.end(
                    JSON.stringify(
                        await data.util.resWrapper(async () => {
                            throw Error('body must be present in request.');
                        })
                    )
                );
                return;
            }

            const { userId } = req.body;
            if (!userId) {
                res.statusCode = 400;
                res.end(
                    JSON.stringify(
                        await data.util.resWrapper(async () => {
                            throw Error(
                                'userId must be specified in the body.'
                            );
                        })
                    )
                );
                return;
            }

            // unset expired token from cookie
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', '', {
                    httpOnly: true,
                    sameSite: 'lax',
                    expires: new Date(Date.now() - 1000),
                    path: '/', // default path is current API url path.
                })
            );
            res.statusCode = 200;
            res.end(
                JSON.stringify(
                    await data.util.resWrapper(async () => {
                        const res = await data.auth.logout(userId);
                        return res;
                    })
                )
            );
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};
