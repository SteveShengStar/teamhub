const util = require('./util');
const { OAuth2Client } = require('google-auth-library');
const authConfig = require('./auth.config.json');
const members = require('./members');

const auth = {};

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
            const res = await members.add({
                name: {
                    first: payload['given_name'],
                    last: payload['family_name'],
                    display: payload['name']
                },
                email: payload['email'],
                imageUrl: payload['picture']
            });
            return res;
        }
    });
};

module.exports = auth;