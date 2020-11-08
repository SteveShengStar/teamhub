const data = require('../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        

        /*
        console.log("****************************************************************************I reached in here.****************************************************************************");
        console.log(req.body);
        console.log("****************************************************************************I reached in here.****************************************************************************");
        */

        if (data.util.checkIsEmptyBody(req.body)) {
            res.statusCode = 400;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                throw Error('body must be present in request.');
            })));
            return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            return await data.members.add(req.body);
        })));
    } else {
        res.statusCode = 404;
        res.end();
    }
};