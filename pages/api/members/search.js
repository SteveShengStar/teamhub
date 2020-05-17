const data = require('../../../backend/data/index.js');
const Cors = require('cors');


const cors = Cors({
    methods: ['POST', 'HEAD']
});

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    await data.util.runCORSMiddlewareHelper(req, res, cors);

    if (req.method === 'POST') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            if (!req.body.options) {
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('options field must be specified in body.');
                })));
            }
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                let fields = null;
                if (req.body.fields) {
                    fields = {};
                    for (const field of req.body.fields) {
                        fields[field] = 1;
                    }
                }
                return await data.members.search(req.body.options, fields);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};