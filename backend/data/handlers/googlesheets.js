const { OAuth2Client } = require('google-auth-library');
const authConfig = require('./auth.config.json');
const { google } = require('googleapis');
const { getAll } = require('./members');

const {
    RETURNING_MEMBERS_FIELDS,
    TEAM_ROSTER_FIELDS,
    START_TERM_FIELDS,
    RETURNING_MEMBERS_SPREADSHEET_HEADERS,
    TEAM_ROSTER_SPREADSHEET_HEADERS,
    START_TERM_SPREADSHEET_HEADERS,
} = require('./constants');

const googlesheets = {};

googlesheets.readfile = async (token) => {
    const client = new OAuth2Client(authConfig['client_id']);
    client.setCredentials({
        access_token: token,
    });
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    const metadata = await googleSheets.spreadsheets.values.get({
        spreadsheetId: '1vijuMLNCltfCWTEPAyxs47-MccvnvXI7wlC-ziS50Ys',
        range: 'Sheet1',
    });
    return metadata;
};

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
        parents: [],
        mimeType: 'application/vnd.google-apps.spreadsheet',
    };
    const driveRequest = {
        resource: fileMetadata,
        fields: 'id',
    };
    const googleDrive = getGoogleDriveClient(token);
    const driveResponse = await googleDrive.files.create(driveRequest);

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
        parents: [],
        mimeType: 'application/vnd.google-apps.spreadsheet',
    };
    const driveRequest = {
        resource: fileMetadata,
        fields: 'id',
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

const getGoogleSheetsClient = (token) => {
    const client = new OAuth2Client(authConfig['client_id']);
    client.setCredentials({
        access_token: token,
    });
    return google.sheets({ version: 'v4', auth: client });
};

const getGoogleDriveClient = (token) => {
    const client = new OAuth2Client(authConfig['client_id']);
    client.setCredentials({
        access_token: token,
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
