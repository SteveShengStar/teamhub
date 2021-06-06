const util = require('./util');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const authConfig = require('./auth.config.json');
const members = require('./members');
const crypto = require('crypto');

require('dotenv').config()

const oauth2Client = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: 'http://localhost:3001/auth/success'
}

const scopes = [
    'https://www.googleapis.com/auth/calendar.events'
]

function getOAuth2Client() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

function getAuthUrl(client) {
    return client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes
    });
}

module.exports.getAuthConsentScreenUrl = function () {
    const client = getOAuth2Client();
    const url = getAuthUrl(client);
    return url;
}

function getOAuth2User(client) {
    return google.oauth2({
        auth: client,
        version: 'v2'
    });
}


module.exports.getGoogleAccountFromCode = async function (code, cb) {
    const client = getOAuth2Client();
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);
    const user = await getOAuth2User(client);

    user.userinfo.get((err, res) => {
        if (err) {
            cb(err);
        } else {
            const userProfile = {
                id: res.data.id,
                accessToken: tokens.access_token,
                name: res.data.name,
                displayPicture: res.data.picture,
                email: res.data.email
            }
            cb(null, userProfile);
        }
    })

}

const auth = {};

/**
 * authHeader: authentication token provided by the client
 * 
 * return: information of the user that corresponds to the input token
 */
auth.checkAnyUser = async (authHeader, res) => {
    if (!authHeader) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Bearer');
        res.end('No auth header found.');
        return false;
    }
    const authType = authHeader.split(' ')[0];
    if (authType !== 'Bearer') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Bearer');
        res.end('No bearer token found.');
        return false;
    }
    const authToken = authHeader.split(' ')[1];
    if (!authToken) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Bearer');
        res.end('No bearer token found.');
        return false;
    }
    const searchRes = await members.search({ token: authToken });
    // TODO: test what happens when token expires
    if (!searchRes || searchRes.length == 0 || searchRes[0].tokenExpiry >= Date.now()) {
        res.statusCode = 403;
        res.end('Token forbidden.');
        return false;
    }
    return searchRes[0];
};

/**
 * authHeader: authentication token provided by the client
 * userId: ID of the user who is attempting to access a secure endpoint or log in
 * 
 * return: true only if authentication was successful.
 */
auth.checkSpecificUser = async (authHeader, userId, res) => {
    if (!authHeader) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Bearer');
        res.end('No auth header found.');
        return false;
    }
    const authType = authHeader.split(' ')[0];
    if (authType !== 'Bearer') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Bearer');
        res.end('No bearer token found.');
        return false;
    }
    const authToken = authHeader.split(' ')[1];
    const searchRes = await members.search({ token: authToken });
    if (!searchRes || searchRes.length == 0 || searchRes[0].id != userId) {
        res.statusCode = 403;
        res.end('Token forbidden.');
        return false;
    }
    if (searchRes[0].tokenExpiry >= Date.now()) {
        res.statusCode = 403;
        res.end('Token expired.');
        return false;
    }
    return true;
};

auth.login = async (tokenObj) => {
    return util.handleWrapper(async () => {
        const client = new OAuth2Client(authConfig['client_id']);
        const ticket = await client.verifyIdToken({
            idToken: tokenObj.tokenId,
            audience: authConfig['client_id'],
        });
        const payload = ticket.getPayload();
        if (payload.hd != 'waterloop.ca') {
            throw new Error('Domain of account not "waterloop.ca"');
        } else {
            const searchRes = await members.search({ email: payload['email'] });
            if (!searchRes || searchRes.length === 0) {
                const token = crypto.randomBytes(32).toString('hex');
                const res = await members.add({
                    name: {
                        first: payload['given_name'],
                        last: payload['family_name']
                    },
                    email: payload['email'],
                    imageUrl: payload['picture'],
                    token,
                    tokenExpiry: Date.now() + (1000 * 60 * 60 * 24 * 7)
                });
                return [res];
            } else {
                const token = crypto.randomBytes(64).toString('hex');
                await members.updateMember({ email: payload['email'] }, {
                    imageUrl: payload['picture'],
                    token,
                    tokenExpiry: Date.now() + (1000 * 60 * 60 * 24 * 7)
                });
                return await members.search({ email: payload['email'] }, false, true);
            }
        }
    });
};

module.exports = auth;