const data = require('../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                let basis;
                if (!req.body.fields) {
                    basis = ["name", "program", "bio", "skills", "interests", "memberType", "subteams", "projects", "email", "stream", "imageUrl", "birthday", "links", "token", "tokenExpiry"]
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