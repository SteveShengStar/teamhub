const data = require('../../../backend/data/index');

// List of Origins that don't need to authenticate but can only access a limited subset of member data
const BYPASS_AUTH_ORIGINS = ['https://teamwaterloop.ca'];

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        const authStatus = BYPASS_AUTH_ORIGINS.includes(req.headers['origin']) 
                            || await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", req.headers['origin']);
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                let basis;
                if (!req.body.fields) {
                    basis = ["name", "program", "bio", "skills", "interests", "memberType", "subteams", "projects", "email", "stream", "imageUrl", "birthday", "links", "token", "tokenExpiry", "active"]
                } else {
                    basis = req.body.fields;
                }

                let fields = {};
                for (const field of basis) {
                    fields[field] = 1;
                }
                return await data.members.getAll(fields);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};