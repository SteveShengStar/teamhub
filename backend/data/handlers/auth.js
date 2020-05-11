const util = require('./util');
const { OAuth2Client } = require('google-auth-library');
const authConfig = require('./auth.config.json');
const crypto = require('crypto');
const members = require('./members');
const db = require('../db');

const auth = {};

const generateToken = async (member_id) => {
    const token = crypto.randomBytes(32).toString('hex').substr(0, 32);
    const created = Date.now();
    const expiry = created + (1000 * 60 * 60 * 24 * 7);
    const createdDate = new Date(created);
    const expiryDate = new Date(expiry);
    const tokenSql = 'INSERT INTO token SET ?';
    const tokenSqlData = {
        token,
        member_id,
        expiry: expiryDate,
        created: createdDate
    };
    await db.query(tokenSql, tokenSqlData);
    return [token, expiry];
};

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
    const tokenSql = 'SELECT * from token WHERE token=? AND expiry > CURRENT_TIMESTAMP';
    const tokenRes = await db.query(tokenSql, authToken);
    if (tokenRes > 0) {
        return await members.search({ id: tokenRes[0].member_id });
    } else {
        res.statusCode = 403;
        res.end('Token forbidden.');
        return false;
    }
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
    const tokenSql = 'SELECT * from token WHERE token=? AND member_id=? AND expiry > CURRENT_TIMESTAMP';
    const tokenRes = await db.query(tokenSql, authToken);
    if (tokenRes > 0) {
        return true;
    } else {
        res.statusCode = 403;
        res.end('Token forbidden.');
        return false;
    }
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
                const memberBody = {
                    name: {
                        first: payload['given_name'],
                        last: payload['family_name']
                    },
                    email: payload['email'],
                    imageUrl: payload['picture'],
                };
                const memberId = (await members.add(memberBody)).id;
                const [token, tokenExpiry] = await generateToken(memberId);
                memberBody.token = token;
                memberBody.tokenExpiry = tokenExpiry;
                return [memberBody];
            } else {
                const memberId = searchRes[0].id;
                await members.updateMember(memberId, {
                    imageUrl: payload['picture'],
                });
                const memberBody = (await members.search({ id: memberId }))[0];
                const [token, tokenExpiry] = await generateToken(memberId);
                memberBody.token = token;
                memberBody.tokenExpiry = tokenExpiry;
                return [memberBody];
            }
        }
    });
};

module.exports = auth;