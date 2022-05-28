const { OAuth2Client } = require('google-auth-library');
const authConfig = require('./auth.config.json');
const {google} = require('googleapis');
const {getAll} = require('./members');

const {RETURNING_MEMBERS_FIELDS, TEAM_ROSTER_FIELDS, RETURNING_MEMBERS_SPREADSHEET_HEADERS, TEAM_ROSTER_SPREADSHEET_HEADERS} = require('./constants');

const exportsheet = {};

exportsheet.readfile = async (token) => {
    const client = new OAuth2Client(authConfig['client_id']);
    client.setCredentials({
        access_token: token
    });
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    const metadata = await googleSheets.spreadsheets.values.get({
        spreadsheetId: '1vijuMLNCltfCWTEPAyxs47-MccvnvXI7wlC-ziS50Ys',
        range: 'Sheet1'
    });
    return metadata;
}

exportsheet.writeTeamRoster = async (token) => {
    const fields = getFields(TEAM_ROSTER_FIELDS);
    let result = await getAll(fields); // Get all the teamhub members' information

    // console.log("databaseResult *******************************");
    // console.log(result[0]);
    // console.log(result[1]);
    // console.log(result[2]);
    
    let normalizedResult = result.map(row => {
        return {
            fullName: row.name.first + " " + row.name.last,
            email: row.email ?? '',
            phoneNumber: row.miscDetails?.phone ?? '',
            memberType: row.memberType?.name ?? '',
            program: row.program ?? '',
            skills: row.skills?.map(skill => skill.name).join() ?? '',
            subteam: row.subteams && row.subteams.length > 0 ? row.subteams[0].name : '',
            termStatus: row.miscDetails?.termStatus ?? '', 
            activeSchoolTerms: row.activeSchoolTerms?.join() ?? '',
            ssdc: row.miscDetails?.designCentreSafty ? 'yes' : 'no',
            whmis: row.miscDetails?.whmis ? 'yes' : 'no' , 
            machineShop: row.miscDetails?.machineShop ? 'yes' : 'no',
        }
    });
    // console.log("normalizedDatabaseResult *******************************");
    // console.log(normalizedResult[0]);
    // console.log(normalizedResult[1]);
    // console.log(normalizedResult[2]);
    
    let spreadsheetData = [TEAM_ROSTER_SPREADSHEET_HEADERS];
    spreadsheetData.push(...normalizedResult.map(data => Object.values(data)));
    
    
    // console.log("excelSheetData *******************************");
    // console.log(spreadsheetData[0]);
    // console.log(spreadsheetData[1]);
    // console.log(spreadsheetData[2]);

    //create new file with drive api
    const googleDrive = getGoogleDriveClient(token);
    const fileMetadata = {
        'name' : 'SashcoSheet',
        parents :[],
    };
    const media = {
        mimeType: 'application/vnd.google-apps.spreadsheet',
    };
    const driveRequest = {
        resource: fileMetadata,
        media: media,
        fields: 'id',
    }; 
    const driveResponse = await googleDrive.files.create(driveRequest);
    console.log(driveResponse);
    //fill in our sheet via sheets api
    const googleSheets = getGoogleSheetsClient(token);
    const request = {
        // The ID of the spreadsheet to update.
        //spreadsheetId: '1vijuMLNCltfCWTEPAyxs47-MccvnvXI7wlC-ziS50Ys', 
        spreadsheetId: driveResponse.data.id,
        // The A1 notation of the values to update.
        range: 'Sheet1',  
        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED', 
        resource: {
            values: spreadsheetData
        },
    };
    const response = await googleSheets.spreadsheets.values.update(request);
    return response.config.url;
}

exportsheet.writeReturningMembers = async (token) => {
    const fields = getFields(RETURNING_MEMBERS_FIELDS);
    let result = await getAll(fields); // Get all the teamhub members' information

    // console.log("databaseResult *******************************");
    // console.log(result[0]);
    // console.log(result[1]);
    // console.log(result[2]);
    
    let normalizedResult = result.map(row => {
        return {
            email: row.email ?? '',
            upcomingTerm: row.miscDetails?.nextSchoolTerm ?? '', 
            activeSchoolTerms: row.activeSchoolTerms?.join() ?? '',
            subteam: row.subteams && row.subteams.length > 0 ? row.subteams[0].name : '',
            nextTermActivity: row.miscDetails?.nextTermActivity ?? '', 
            nextTermRole: row.miscDetails?.nextTermRole ?? '', 
            personalEmail: row.miscDetails?.personalEmail ?? '', 
            termComments: row.miscDetails?.termComments ?? '', 
            desiredWork: row.miscDetails?.desiredWork ?? '', 
        }
    });
    // console.log("normalizedDatabaseResult *******************************");
    // console.log(normalizedResult[0]);
    // console.log(normalizedResult[1]);
    // console.log(normalizedResult[2]);
    
    let spreadsheetData = [RETURNING_MEMBERS_SPREADSHEET_HEADERS];
    spreadsheetData.push(...normalizedResult.map(data => Object.values(data)));
    
    
    // console.log("excelSheetData *******************************");
    // console.log(spreadsheetData[0]);
    // console.log(spreadsheetData[1]);
    // console.log(spreadsheetData[2]);

    const googleSheets = getGoogleSheetsClient(token);
    const request = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1vijuMLNCltfCWTEPAyxs47-MccvnvXI7wlC-ziS50Ys',
        // The A1 notation of the values to update.
        range: 'Sheet2',  
        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: spreadsheetData
        },
    };
    const response = await googleSheets.spreadsheets.values.update(request);
    return response.config.url;
}

const getGoogleSheetsClient = (token) => {
    const client = new OAuth2Client(authConfig['client_id']);
    client.setCredentials({
        access_token: token
    });
    return google.sheets({ version: 'v4', auth: client });
}

const getGoogleDriveClient = (token) => {
    const client = new OAuth2Client(authConfig['client_id']);
    client.setCredentials({
        access_token: token
    });
    return google.drive({ version: 'v3', auth: client });
}

const getFields = (listOfFields) => {
    let fields = {};
    for (const field of listOfFields) {
        fields[field] = 1;
    }
    return fields;
}

module.exports = exportsheet;