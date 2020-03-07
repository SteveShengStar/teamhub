const util = require('./util');
const { OAuth2Client } = require('google-auth-library');
const authConfig = require('./auth.config.json');
const members = require('./members');
const crypto = require('crypto');

const auth = {};

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
    const searchRes = await members.search({ token: authToken });
    if (!searchRes || searchRes.length == 0 || searchRes[0].tokenExpiry >= Date.now()) {
        res.statusCode = 403;
        res.end('Token forbidden.');
        return false;
    }
    return searchRes[0];
};

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
    if (!searchRes || searchRes.length == 0 || searchRes[0].id != userId || searchRes[0].tokenExpiry >= Date.now()) {
        res.statusCode = 403;
        res.end('Token forbidden.');
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
        console.log(payload);
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
                    name: {
                        first: payload['given_name'],
                        last: payload['family_name']
                    },
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