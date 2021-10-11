const data = require('../../../backend/data/index');

// List of Origins that don't need to authenticate but can only access a limited subset of member data
const BYPASS_AUTH_ORIGINS = ['https://teamwaterloop.ca/'];

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        const authStatus = BYPASS_AUTH_ORIGINS.includes(req.headers['Referer']) 
                            || await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                let basis;
                // Create a list of fields that must be returned for each member
                if (!req.body.fields) {
                    basis = ["name", "program", "bio", "skills", "interests", "memberType", "subteams", "projects", "email", "stream", "imageUrl", "birthday", "links", "token", "tokenExpiry"]
                } else {
                    basis = req.body.fields;
                }

                // If the request is coming from the Waterloop website don't send back any sensitive data
                if (BYPASS_AUTH_ORIGINS.includes(req.headers['origin'])) {
                    if (basis.includes("token")) {
                        let index = basis.indexOf("token"); 
                        basis.splice(index, 1); // Remove token from return-fields list
                    } 
                    if (basis.includes("tokenExpiry")) {
                        let index = basis.indexOf("tokenExpiry");
                        basis.splice(index, 1); // Remove tokenExpiry from return-fields list
                    }
                }

                // Convert this list of fields into an object, with a 1-flag indicating that we want to return a certain field in the response
                let fields = {};
                for (const field of basis) {
                    fields[field] = 1;
                }
                return await data.members.getAll(fields);   // get and return a list of members and their details.
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};