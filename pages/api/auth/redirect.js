const data = require('../../../backend/data/index');

export default async (req, res) => {
    await data.initIfNotStarted();
    console.log("Outside the Get")
    if (req.method === 'GET') {
        console.log("Inside the Get")
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200; 
        return res.end(JSON.stringify(await data.util.resWrapper(async () => {
            await data.auth.authorize(req.query.code);
        })));
    } else {
        res.statusCode = 404;       // TODO: Need better status code and method of handling a redirect failure
        res.end();
    }
};
