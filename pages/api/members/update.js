// Route is meant to add a new parameter to all members
// e.g, if req.body was { active: true }, then it add an active: true to all members in the db
const data = require('../../../backend/data/index.js');
const cookie = require('cookie');

const BYPASS_AUTH_ORIGINS = ['https://teamwaterloop.ca'];

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus =
            BYPASS_AUTH_ORIGINS.includes(req.headers['origin']) ||
            (await data.auth.checkAnyUser(token, res));

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
            res.statusCode = 200;

            res.end(
                JSON.stringify(
                    await data.util.resWrapper(async () => {
                        return await data.members.updateAllMembers({
                            $set: req.body,
                        });
                    })
                )
            );
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};
