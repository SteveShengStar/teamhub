const util = require('./util');
const { OAuth2Client } = require('google-auth-library');
const authConfig = require('./auth.config.json');
const members = require('./members');
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

const auth = {};

/**
 * Returns whether or not the user is an Admin.
 * Admins can edit forms.
 */
async function isAdmin(userEmail) {
    // Service Account configurations can be found at https://console.cloud.google.com/iam-admin/serviceaccounts?project=teamhub-257722
    const jwtClient = new JWT({
        scopes: ['https://www.googleapis.com/auth/admin.directory.group'],
        email: 'teamhubbackend@teamhub-257722.iam.gserviceaccount.com', // the Service Account used to execute Google Admin SDK functions
        key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQcY0JI2qovIje\n0CRbYd3JV2890/4Evea+JcskaiwxjC1dNhnYglSinQp+ELsT1ExJQ1ht3o/b6YLh\npfMvkwV0Pig4WRUJrbvv2KugZaFansxbJIqRlmPOZ7p4FYHruVxsyx+DsepOLwkB\nk1xuzAXIm+DA3kjX0b1pOF/b5KxDYbM2uJ//2JiX+hwvSJZpEenm2XhCQ3+iNyxN\nSaXVfMFVKeN13XYBlmYM4gF47VrwvKWYqtbuHnzkW1k8+BozwyKyCl1axIa5vo3w\n+bbw2GWy73DEGjVXG2mzyrTYj3iGXW6pSjq0RLbsZCNW1/nHPlVIQazUnHYiVlmA\nYEo2ohNpAgMBAAECggEADarXCw7Z8FdwXV+7dTciYjshQvtn+qqdpcEiTpscQQwb\nxggFQ3zZjNIMPT4z7gsWYhq618q8lw2ldHiQ91Zws0cHacPEN96+5cKeD5sqVx/2\nGVHOONk/ZmocasGfmQkN5jT0C4q6aMb3vwqJCIYd06IOPMc2coRA+FRnIKrKoB5P\nnTIlBSLKbgVz3tDgOl3hN0f+BL+GPxh0M65ErXN6lXGE7S2tDuMkxLf2CT7ncHDd\nrEWeDsz1+kal1fOYMlT1wk1BFbNM0jPiOtZS5FiOrP9QdJOUWool6Wq/tcfzM6fY\ngHnH5TtqtuOaoC3jK4YI3aBOH5hwowzkolL56McQiQKBgQD8C17PhyALaNcc0vNv\ngCbIjGsqZB3hRrvQ4l+Qk3Wv7zEtiehFH0bNJi77UAQ4X/xHde0F1TBD9LvN9KKZ\n4DMPnASdgkkk8Z+WWmhM999WbEomfHqhspdJ/tmgchY/wKKYKoZRYWZU3rzhEr1J\nXhnaZnBMBFB10XSzYTaFiaeTZQKBgQDTtwHKZe02DFzC1lNm4MUvwraCkQ4yQ0ry\nAMt138VGs7MgOFDXcxV7vOeA7gZ0T3W5du6l3w2cgAYBQ2IxEUHjVOl/hzMtRFc4\nFXe5TiWmTZYuVgnIHs/Q0RxXwcqIFEFyOQHJblBSXfrj37D2w12CTKdnO9WX/gWe\n5ntSP5oZtQKBgAv9xn79IMsqK8HVT3uojy/PbnHP3ZQQN3NSsdVBDsJWEPLnssNH\nH6k2/dk7D1hXSLtlouc6I1e4Vw8PaoUDo6pEc/vCbRRy4nLWzkuLJ3cHI+f82CDF\nTGla1KPLib9yvMmcjFNm3OWAy1+x8ouBDJ3VbdZQBjv0wSafo2ZrDCv5AoGAbsxl\n2YDCRfjuSuFTwJF9YONsFKTJYzCodkJIOKYlXj0JT6FpXXfTFHDmTylCo3g6Shee\nCZzUSMUPX3XeW4OGkeyMTrt44wXTB3zkrUvilEgigplwgRTu+X+Wb67xyYmgPqDq\n+HoM+y5H8R3ORTY1J83qBjLgM60zT9ebTo4OnckCgYEA2jIBh6Rk6eayIcaeUEzQ\nUgdNXYe9chWKz0S7EzZms7Qdr9BlYtz0ZTEqCX9wQn3fTkSqNpJYG9mk6c/LkNsC\nZsfivQU4Kmp812T96dhQ4I/AJ1ZfmSgKIKmEvWCRe/18SU2CcINsZJIEXP9nZcTC\nk+PZEd6GDf8EqtTUezgky4M=\n-----END PRIVATE KEY-----\n', // TODO: Private Key cannot be committed to remote.
        subject: 'steven.x@waterloop.ca', // Make the Service Account impersonate "steven.x@waterloop.ca", a previleged admin user, since the Google Admin SDK requires the highest-level permissions
        // For reference, look inside the constructor definition/documentation of "JWT" and refer to:
        // 1. https://cloud.google.com/iam/docs/impersonating-service-accounts
        // 2. https://levelup.gitconnected.com/service-account-authentication-on-gcp-via-node-js-app-34b3cc759bc4
    });

    const adminClient = google.admin({
        version: 'directory_v1',
        auth: jwtClient,
    });
    const groups = await adminClient.groups.list({
        userKey: userEmail,
    });
    for (const group of groups.data.groups) {
        if (group.name === 'Leads') {
            // If current user belongs to the Leads group in Google Groups, grant them permission to execute this endpoint.
            return true;
        }
    }
    return false;
}

/**
 * Check that the user's session token is valid
 *
 * @param {String} token:               user session token
 * @param {String} res:                 api response object
 * @param {String} ignoreTokenExpiry:   ignore the token expiry date
 *
 * @return: information for the user
 */
auth.checkAnyUser = async (token, res, ignoreTokenExpiry = false) => {
    if (!token) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Bearer');
        res.end('No bearer token found.');
        return false;
    }
    const searchRes = await members.search({ token: token });
    if (
        !searchRes ||
        searchRes.length === 0 ||
        (!ignoreTokenExpiry && searchRes[0].tokenExpiry < Date.now())
    ) {
        res.statusCode = 403;
        res.end('Token forbidden.');
        return false;
    }
    return searchRes[0];
};

/**
 * Check that the user's session token is valid. Also check that the user is an Admin with elevated priveleges
 *
 * @param {String} token:               user session token
 * @param {String} res:                 api response object
 * @param {String} ignoreTokenExpiry:   ignore the token expiry date
 *
 * @return: information for the admin user
 */
auth.checkAnyAdminUser = async (token, res, ignoreTokenExpiry = false) => {
    if (!token) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Bearer');
        res.end('No bearer token found.');
        return false;
    }
    const searchRes = await members.search({ token: token });
    if (
        !searchRes ||
        searchRes.length === 0 ||
        (!ignoreTokenExpiry && searchRes[0].tokenExpiry < Date.now())
    ) {
        res.statusCode = 403;
        res.end('Token forbidden.');
        return false;
    }
    if (!isAdmin(searchRes[0].email)) {
        res.statusCode = 403;
        res.end('Not enough priveleges to perform the action.');
        return false;
    }
    return searchRes[0];
};

/**
 * Check that the user's session token is valid. Make sure the token belongs to the user identified by user id.
 * This ensures that another user (ie. Sam) doesn't modify Bob's personal info.
 *
 * @param {String} token:  user session token
 * @param {String} userId: ID of the user who is attempting to access a secure endpoint or log in
 *
 * @return: true, if authentication was successful.
 */
auth.checkSpecificUser = async (token, userId, res) => {
    if (!token) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Bearer');
        res.end('No bearer token found.');
        return false;
    }
    const searchRes = await members.search({ token: token });
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
                const user = await members.add({
                    name: {
                        first: payload['given_name'],
                        last: payload['family_name'],
                    },
                    email: payload['email'],
                    imageUrl: payload['picture'],
                    token: tokenObj.accessToken,
                    tokenExpiry: tokenObj.tokenObj.expires_at,
                    active: true,
                });
                return {
                    userData: user,
                    isExistingUser: false,
                };
            } else {
                // Update the access token and its expiry date of an existing user
                await members.updateMember(
                    { email: payload['email'] },
                    {
                        imageUrl: payload['picture'],
                        token: tokenObj.accessToken,
                        tokenExpiry: tokenObj.tokenObj.expires_at,
                    }
                );
                const user = await members.search(
                    { email: payload['email'] },
                    false,
                    true
                );
                return {
                    userData: user[0],
                    isExistingUser: true,
                };
            }
        }
    });
};

auth.logout = async (userId) => {
    return util.handleWrapper(async () => {
        // Reference: https://developers.google.com/identity/sign-in/web/sign-in#sign_out_a_user
        const searchRes = await members.search({ _id: userId });
        if (searchRes && searchRes.length === 1) {
            const res = await members.updateMember(
                { _id: userId },
                {
                    token: '',
                    tokenExpiry: null,
                }
            );
            return res;
        } else {
            throw new Error('Failed to log the user out properly.');
        }
    });
};

module.exports = auth;
