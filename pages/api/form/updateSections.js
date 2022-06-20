const data = require('../../../backend/data/index');
const cookie = require('cookie');
const { OAuth2Client } = require('google-auth-library');
const {Auth, google} = require('googleapis');
const fs = require('fs');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        
        // Get the Access Token from the request headers
        // const token = cookie.parse(req.headers.cookie).token;
        // const authStatus = await data.auth.checkAnyUser(`Bearer ${token}`, res);

        if (true) {
            const auth = new Auth.GoogleAuth({
                keyFile:"teamhub-257722-360b22045bbc.json",
                scopes:"https://www.googleapis.com/auth/admin.directory.group.readonly",
            })
            client = await auth.getClient()
            // Obtain a new drive client, making sure you pass along the auth client
            const admin = google.admin({ version: 'directory_v1', auth: client });

            const groups = await admin.groups.list({
                domain: "waterloop.ca",
            });
            console.log(groups.data.groups);
            // check for valid group
            //const token = req.headers['authorization'].split(' ')[1];
            //const gAdminClient = getGAdminClient(token);
            // get user ID properly
            //let groupKeys = await getGroupKeys(gAdminClient, "sashco.m@waterloop.ca");  // Fetch all groups that the user is a member of in Google Groups
            //let groupIds = await keysToIds(db, groupKeys);  // Translate group keys into groups ids 
            //console.log(groupKeys)
            //
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

/*
const keysToIds = async (db, groupKeys) => {
    let groupIds = [];
    if (groupKeys && groupKeys.length > 0) {
      try {
        let query = 'SELECT id FROM groups WHERE group_key IN (' + groupKeys.map(_ => '?').join(',') + ');'
        groupIds = ( await db.raw(query, [...groupKeys] )).rows.map(row => row.id);
      } catch(e) {
        console.log(e);
        groupIds = [];
      }
    } 
    return groupIds;
}
*/

const getGroupKeys = async (gAdminClient, userId) => {
    try {
        let res = await gAdminClient.groups.list({
        userKey: userId
        })
        const groupKeys = res.data.groups.map(g => g.id); // These are group_keys
        return groupKeys;
    } catch (err) {
        console.log('Error: Google Admin API groups.list() call returned an error: ', err);   // TODO: handle error properly
        console.log(gAdminClient);
        return [];
    };
}

const getGAdminClient = (accessToken) => {
    const client = new OAuth2Client(process.env.client_id);
    client.setCredentials({
        access_token: accessToken
    });
    const gAdminClient = google.admin({
        version : "directory_v1",
        auth: client
    });
    return gAdminClient;
}