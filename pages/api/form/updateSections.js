const data = require('../../../backend/data/index');
const cookie = require('cookie');
const {google} = require('googleapis');
const {JWT} = require('google-auth-library');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const searchRes = await data.auth.checkAnyUser(`Bearer ${token}`, res);

        if (searchRes && await isAdmin(searchRes['email'])) {
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

async function isAdmin(userEmail) {
    // Service Account configurations can be found at https://console.cloud.google.com/iam-admin/serviceaccounts?project=teamhub-257722
    const jwtClient = new JWT({
        scopes: ["https://www.googleapis.com/auth/admin.directory.group"],
        email: "teamhubbackend@teamhub-257722.iam.gserviceaccount.com",  // the Service Account used to execute Google Admin SDK functions
        key: "", // TODO: Private Key cannot be committed to remote.
        subject: "steven.x@waterloop.ca"  // Make the Service Account impersonate "steven.x@waterloop.ca", a previleged admin user, since the Google Admin SDK requires the highest-level permissions
                                          // For reference, look inside the constructor definition/documentation of "JWT" and refer to:
                                          // 1. https://cloud.google.com/iam/docs/impersonating-service-accounts
                                          // 2. https://levelup.gitconnected.com/service-account-authentication-on-gcp-via-node-js-app-34b3cc759bc4
    });

    const adminClient = google.admin({ version: 'directory_v1', auth: jwtClient });
    const groups = await adminClient.groups.list({
        userKey: userEmail,
    });
    for(const group of groups.data.groups) {
        if (group.name === 'Leads') {  // If current user belongs to the Leads group in Google Groups, grant them permission to execute this endpoint.
            return true;
        }
    }    
    return false;
}