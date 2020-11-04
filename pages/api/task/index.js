const data = require('../../../backend/data/index');
const Cors = require('cors');


const cors = Cors({
    methods: ['GET', 'HEAD']
});


module.exports = async (req, res) => {
    await data.initIfNotStarted();
    await data.util.runCORSMiddlewareHelper(req, res, cors);
    
    if (req.method === 'GET') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.task.getAll();
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};