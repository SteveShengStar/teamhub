const { JWT } = require('google-auth-library');
const { google } = require('googleapis');
const { getAll } = require('./members');

const {
    RETURNING_MEMBERS_FIELDS,
    TEAM_ROSTER_FIELDS,
    RETURNING_MEMBERS_SPREADSHEET_HEADERS,
    TEAM_ROSTER_SPREADSHEET_HEADERS,
    MEMBER_RESPONSES_FOLDER_ID,
} = require('./constants');

const googlesheets = {};

googlesheets.writefile = async (token, formName) => {
    switch (formName) {
        case 'register':
        case 'startofterm':
            return exportRegister(token);
        case 'returning':
            return exportReturning(token);
    }
};

const exportRegister = async (token) => {
    const fields = getFields(TEAM_ROSTER_FIELDS);
    const userData = (await getAll(fields)).map((row) => {
        return {
            fullName: row.name.first + ' ' + row.name.last,
            email: row.email ?? '',
            phoneNumber: row.miscDetails?.phone ?? '',
            memberType: row.memberType?.name ?? '',
            program: row.program ?? '',
            skills: row.skills?.map((skill) => skill.name).join() ?? '',
            subteam:
                row.subteams && row.subteams.length > 0
                    ? row.subteams[0].name
                    : '',
            termStatus: row.miscDetails?.termStatus ?? '',
            activeSchoolTerms: row.activeSchoolTerms?.join() ?? '',
            ssdc: row.miscDetails?.designCentreSafety ? 'yes' : 'no',
            whmis: row.miscDetails?.whmis ? 'yes' : 'no',
            machineShop: row.miscDetails?.machineShop ? 'yes' : 'no',
        };
    });

    const spreadsheetData = [TEAM_ROSTER_SPREADSHEET_HEADERS];
    spreadsheetData.push(...userData.map((data) => Object.values(data)));

    //create new file with Drive api
    const currentDate = new Date();
    const fileName = `Waterloop Roster - ${currentDate.toLocaleString('en-CA', {
        timeZone: 'EST',
    })}`;
    const fileMetadata = {
        name: fileName,
        parents: [MEMBER_RESPONSES_FOLDER_ID],
        mimeType: 'application/vnd.google-apps.spreadsheet',
    };
    const driveRequest = {
        resource: fileMetadata,
        fields: 'id',
        supportsAllDrives: true,
    };
    const googleDrive = getGoogleDriveClient(token);
    const driveResponse = await googleDrive.files.create(driveRequest);
    console.log('driveResponse');
    console.log(driveResponse);

    // update spreadsheet
    const request = {
        spreadsheetId: driveResponse.data.id,
        range: 'Sheet1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: spreadsheetData,
        },
    };
    const googleSheets = getGoogleSheetsClient(token);
    const response = await googleSheets.spreadsheets.values.update(request);
    return response.config.url;
};

const exportReturning = async (token) => {
    const fields = getFields(RETURNING_MEMBERS_FIELDS);
    const userData = (await getAll(fields)).map((row) => {
        return {
            email: row.email ?? '',
            upcomingTerm: row.miscDetails?.nextSchoolTerm ?? '',
            activeSchoolTerms: row.activeSchoolTerms?.join() ?? '',
            subteam:
                row.subteams && row.subteams.length > 0
                    ? row.subteams[0].name
                    : '',
            nextTermActivity: row.miscDetails?.nextTermActivity ?? '',
            nextTermRole: row.miscDetails?.nextTermRole ?? '',
            personalEmail: row.miscDetails?.personalEmail ?? '',
            termComments: row.miscDetails?.termComments ?? '',
            desiredWork: row.miscDetails?.desiredWork ?? '',
        };
    });

    const spreadsheetData = [RETURNING_MEMBERS_SPREADSHEET_HEADERS];
    spreadsheetData.push(...userData.map((data) => Object.values(data)));

    //create new file with Drive api
    const currentDate = new Date();
    const fileName = `Returning Members Form Responses - ${currentDate.toLocaleString(
        'en-CA',
        { timeZone: 'EST' }
    )}`;
    const fileMetadata = {
        name: fileName,
        parents: [MEMBER_RESPONSES_FOLDER_ID],
        mimeType: 'application/vnd.google-apps.spreadsheet',
    };
    const driveRequest = {
        resource: fileMetadata,
        fields: 'id',
        supportsAllDrives: true,
    };
    const googleDrive = getGoogleDriveClient(token);
    const driveResponse = await googleDrive.files.create(driveRequest);

    const request = {
        spreadsheetId: driveResponse.data.id,
        range: 'Sheet1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: spreadsheetData,
        },
    };

    const googleSheets = getGoogleSheetsClient(token);
    const response = await googleSheets.spreadsheets.values.update(request);
    return response.config.url;
};

const getGoogleSheetsClient = () => {
    const client = new JWT({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        email: 'teamhubbackend@teamhub-257722.iam.gserviceaccount.com',
        key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQcY0JI2qovIje\n0CRbYd3JV2890/4Evea+JcskaiwxjC1dNhnYglSinQp+ELsT1ExJQ1ht3o/b6YLh\npfMvkwV0Pig4WRUJrbvv2KugZaFansxbJIqRlmPOZ7p4FYHruVxsyx+DsepOLwkB\nk1xuzAXIm+DA3kjX0b1pOF/b5KxDYbM2uJ//2JiX+hwvSJZpEenm2XhCQ3+iNyxN\nSaXVfMFVKeN13XYBlmYM4gF47VrwvKWYqtbuHnzkW1k8+BozwyKyCl1axIa5vo3w\n+bbw2GWy73DEGjVXG2mzyrTYj3iGXW6pSjq0RLbsZCNW1/nHPlVIQazUnHYiVlmA\nYEo2ohNpAgMBAAECggEADarXCw7Z8FdwXV+7dTciYjshQvtn+qqdpcEiTpscQQwb\nxggFQ3zZjNIMPT4z7gsWYhq618q8lw2ldHiQ91Zws0cHacPEN96+5cKeD5sqVx/2\nGVHOONk/ZmocasGfmQkN5jT0C4q6aMb3vwqJCIYd06IOPMc2coRA+FRnIKrKoB5P\nnTIlBSLKbgVz3tDgOl3hN0f+BL+GPxh0M65ErXN6lXGE7S2tDuMkxLf2CT7ncHDd\nrEWeDsz1+kal1fOYMlT1wk1BFbNM0jPiOtZS5FiOrP9QdJOUWool6Wq/tcfzM6fY\ngHnH5TtqtuOaoC3jK4YI3aBOH5hwowzkolL56McQiQKBgQD8C17PhyALaNcc0vNv\ngCbIjGsqZB3hRrvQ4l+Qk3Wv7zEtiehFH0bNJi77UAQ4X/xHde0F1TBD9LvN9KKZ\n4DMPnASdgkkk8Z+WWmhM999WbEomfHqhspdJ/tmgchY/wKKYKoZRYWZU3rzhEr1J\nXhnaZnBMBFB10XSzYTaFiaeTZQKBgQDTtwHKZe02DFzC1lNm4MUvwraCkQ4yQ0ry\nAMt138VGs7MgOFDXcxV7vOeA7gZ0T3W5du6l3w2cgAYBQ2IxEUHjVOl/hzMtRFc4\nFXe5TiWmTZYuVgnIHs/Q0RxXwcqIFEFyOQHJblBSXfrj37D2w12CTKdnO9WX/gWe\n5ntSP5oZtQKBgAv9xn79IMsqK8HVT3uojy/PbnHP3ZQQN3NSsdVBDsJWEPLnssNH\nH6k2/dk7D1hXSLtlouc6I1e4Vw8PaoUDo6pEc/vCbRRy4nLWzkuLJ3cHI+f82CDF\nTGla1KPLib9yvMmcjFNm3OWAy1+x8ouBDJ3VbdZQBjv0wSafo2ZrDCv5AoGAbsxl\n2YDCRfjuSuFTwJF9YONsFKTJYzCodkJIOKYlXj0JT6FpXXfTFHDmTylCo3g6Shee\nCZzUSMUPX3XeW4OGkeyMTrt44wXTB3zkrUvilEgigplwgRTu+X+Wb67xyYmgPqDq\n+HoM+y5H8R3ORTY1J83qBjLgM60zT9ebTo4OnckCgYEA2jIBh6Rk6eayIcaeUEzQ\nUgdNXYe9chWKz0S7EzZms7Qdr9BlYtz0ZTEqCX9wQn3fTkSqNpJYG9mk6c/LkNsC\nZsfivQU4Kmp812T96dhQ4I/AJ1ZfmSgKIKmEvWCRe/18SU2CcINsZJIEXP9nZcTC\nk+PZEd6GDf8EqtTUezgky4M=\n-----END PRIVATE KEY-----\n', //process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
    });
    return google.sheets({ version: 'v4', auth: client });
};

const getGoogleDriveClient = () => {
    const client = new JWT({
        scopes: ['https://www.googleapis.com/auth/drive'],
        email: 'teamhubbackend@teamhub-257722.iam.gserviceaccount.com',
        key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQcY0JI2qovIje\n0CRbYd3JV2890/4Evea+JcskaiwxjC1dNhnYglSinQp+ELsT1ExJQ1ht3o/b6YLh\npfMvkwV0Pig4WRUJrbvv2KugZaFansxbJIqRlmPOZ7p4FYHruVxsyx+DsepOLwkB\nk1xuzAXIm+DA3kjX0b1pOF/b5KxDYbM2uJ//2JiX+hwvSJZpEenm2XhCQ3+iNyxN\nSaXVfMFVKeN13XYBlmYM4gF47VrwvKWYqtbuHnzkW1k8+BozwyKyCl1axIa5vo3w\n+bbw2GWy73DEGjVXG2mzyrTYj3iGXW6pSjq0RLbsZCNW1/nHPlVIQazUnHYiVlmA\nYEo2ohNpAgMBAAECggEADarXCw7Z8FdwXV+7dTciYjshQvtn+qqdpcEiTpscQQwb\nxggFQ3zZjNIMPT4z7gsWYhq618q8lw2ldHiQ91Zws0cHacPEN96+5cKeD5sqVx/2\nGVHOONk/ZmocasGfmQkN5jT0C4q6aMb3vwqJCIYd06IOPMc2coRA+FRnIKrKoB5P\nnTIlBSLKbgVz3tDgOl3hN0f+BL+GPxh0M65ErXN6lXGE7S2tDuMkxLf2CT7ncHDd\nrEWeDsz1+kal1fOYMlT1wk1BFbNM0jPiOtZS5FiOrP9QdJOUWool6Wq/tcfzM6fY\ngHnH5TtqtuOaoC3jK4YI3aBOH5hwowzkolL56McQiQKBgQD8C17PhyALaNcc0vNv\ngCbIjGsqZB3hRrvQ4l+Qk3Wv7zEtiehFH0bNJi77UAQ4X/xHde0F1TBD9LvN9KKZ\n4DMPnASdgkkk8Z+WWmhM999WbEomfHqhspdJ/tmgchY/wKKYKoZRYWZU3rzhEr1J\nXhnaZnBMBFB10XSzYTaFiaeTZQKBgQDTtwHKZe02DFzC1lNm4MUvwraCkQ4yQ0ry\nAMt138VGs7MgOFDXcxV7vOeA7gZ0T3W5du6l3w2cgAYBQ2IxEUHjVOl/hzMtRFc4\nFXe5TiWmTZYuVgnIHs/Q0RxXwcqIFEFyOQHJblBSXfrj37D2w12CTKdnO9WX/gWe\n5ntSP5oZtQKBgAv9xn79IMsqK8HVT3uojy/PbnHP3ZQQN3NSsdVBDsJWEPLnssNH\nH6k2/dk7D1hXSLtlouc6I1e4Vw8PaoUDo6pEc/vCbRRy4nLWzkuLJ3cHI+f82CDF\nTGla1KPLib9yvMmcjFNm3OWAy1+x8ouBDJ3VbdZQBjv0wSafo2ZrDCv5AoGAbsxl\n2YDCRfjuSuFTwJF9YONsFKTJYzCodkJIOKYlXj0JT6FpXXfTFHDmTylCo3g6Shee\nCZzUSMUPX3XeW4OGkeyMTrt44wXTB3zkrUvilEgigplwgRTu+X+Wb67xyYmgPqDq\n+HoM+y5H8R3ORTY1J83qBjLgM60zT9ebTo4OnckCgYEA2jIBh6Rk6eayIcaeUEzQ\nUgdNXYe9chWKz0S7EzZms7Qdr9BlYtz0ZTEqCX9wQn3fTkSqNpJYG9mk6c/LkNsC\nZsfivQU4Kmp812T96dhQ4I/AJ1ZfmSgKIKmEvWCRe/18SU2CcINsZJIEXP9nZcTC\nk+PZEd6GDf8EqtTUezgky4M=\n-----END PRIVATE KEY-----\n',
    });
    return google.drive({ version: 'v3', auth: client });
};

const getFields = (listOfFields) => {
    let fields = {};
    for (const field of listOfFields) {
        fields[field] = 1;
    }
    return fields;
};

module.exports = googlesheets;
