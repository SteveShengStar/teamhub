const util = require('./util');

const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const authConfig = require('./auth.config.json');
const members = require('./members');
const crypto = require('crypto');

require('dotenv').config()

const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: 'http://localhost:3000/api/auth/redirect'
}

function getOAuth2Client() {
    return new OAuth2Client(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    'profile',
    'email'
]

function getOAuthConsentScreenUrl(client, email) {
    return client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
        state: email
    });
}

function getOAuth2User(client) {
    return google.oauth2({
        auth: client,
        version: 'v2'
    });
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
        const client = getOAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: tokenObj.tokenId,
            audience: googleConfig.clientId,
        });
        const payload = ticket.getPayload();
        if (payload.hd != 'waterloop.ca') {
            throw new Error('Domain of account not "waterloop.ca"');
        } else {
            const searchRes = await members.search({ email: payload['email'] });
            if (!searchRes || searchRes.length === 0) {
                // Create new user
                const userProfile = await members.add({
                    name: {
                        first: payload['given_name'],
                        last: payload['family_name']
                    },
                    email: payload['email'],
                    imageUrl: payload['picture']
                });
                return [userProfile, getOAuthConsentScreenUrl(client, payload['email'])];
            }// else {
            //     const token = crypto.randomBytes(64).toString('hex');
            //     await members.updateMember({ email: payload['email'] }, {
            //         imageUrl: payload['picture'],
            //         token,
            //         tokenExpiry: Date.now() + (1000 * 60 * 60 * 24 * 7)
            //     });
            //     res.statusCode = 200;
            //     return await members.search({ email: payload['email'] }, false, true);
            // }
        }
    });
};

auth.authorize = async (authCode, email) => {   
    const client = getOAuth2Client();       // TODO: I probably do not need to create a new instance so frequently
    client.on('tokens', (tokens) => {       // TODO: I probably should not register this event handler multiple times.
        if (tokens.refresh_token) {
            // store the refresh_token in my database!
            console.log("Refresh:");
            console.log(tokens.refresh_token);
            await members.updateMember({email: email}, {refToken: tokens.refresh_token});    // TODO: Proper exception handling
        }
        console.log("Access:");
        console.log(tokens.access_token);
    });

    const { tokens } = await client.getToken(authCode);
    client.setCredentials(tokens);
    const user = await getOAuth2User(client);

    // print info about access token
    const tokenInfo = await client.getTokenInfo(tokens.access_token);
    console.log("Token Info:");
    console.log(tokenInfo);
    
    user.userinfo.get((err, res) => {
        if (err) {
            console.log("Error getting user info from user object.");
        } else {
            //console.log(user); // TODO: Do I really need to update this entry on every call ?
            // Store access token and expiry date in database
            await members.updateMember({email: email}, {token: tokens.access_token, tokenExpiry: tokenInfo.expiry_date});     // TODO: proper exception handling
        }
    });
    return {message: "Successfully authorized Team Hub to access the user's Google data."};
}

module.exports = auth;