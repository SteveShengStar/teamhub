const data = require('../../../backend/data/index');

export default async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'GET') {
        console.log("Inside the Get");
        const {code: authCode, state: email} = req.query;

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Location', '/login/name');
        res.statusCode = 307; 
        await data.auth.authorize(authCode, email); // TODO: error handling
        res.end()
    } else {
        res.statusCode = 404;       // TODO: Need better status code and method of handling a redirect failure
        res.end();
    }
};
