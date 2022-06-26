const data = require('../../../backend/data/index');
const cookie = require('cookie');
const { OAuth2Client } = require('google-auth-library');
const {Auth, google} = require('googleapis');
const members = require('../../../backend/data/handlers/members');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        
        // Get the Access Token from the request headers
        // const token = cookie.parse(req.headers.cookie).token;
        // const authStatus = await data.auth.checkAnyUser(`Bearer ${token}`, res);
        // REPLACE WITH ABOVE

        const authToken = req.headers['authorization'].split(' ')[1];
        const searchRes = await members.search({ token: authToken });
        if (searchRes.length != 0 && await isLead(searchRes[0]['email'])) {

            res.setHeader('Content-Type', 'application/json');

            res.statusCode = 200;
            
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.forms.updateFormSections(req.body);
            })));
        } else {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Bearer');
            res.end('Unauthorized user.');
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};

async function isLead(userEmail) {
    const auth = new Auth.GoogleAuth({
        keyFile:"teamhub-257722-07d1d3b57421.json",
        scopes:"https://www.googleapis.com/auth/admin.directory.group",
        clientOptions: {
            email:"teamhubbackend@teamhub-257722.iam.gserviceaccount.com",
            //impersonate steven >:)
            subject: "steven.x@waterloop.ca",
        }
    })
    client = await auth.getClient()
    // Obtain a new admin client, making sure you pass along the auth client
    const admin = google.admin({ version: 'directory_v1', auth: client });

    const groups = await admin.groups.list({
        //domain: "waterloop.ca",
        //customer:"C049m7qgz",
        userKey: userEmail,
    });
    for(const group of groups.data.groups) {
        if(group.name == 'Leads') return true
    }    
    return false
}