const { OAuth2Client } = require('google-auth-library');
const authConfig = require('./auth.config.json');
const {google} = require('googleapis');
const {getAll} = require('./members');

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

exportsheet.write = async (token) => {


    const fieldsToReturn = ["name", "program", "bio", "skills", "interests", "memberType", "subteams", "projects", "email", "stream", "imageUrl", "links", "token", "tokenExpiry", "active"]
    let fields = {};
    for (const field of fieldsToReturn) {
        fields[field] = 1;
    }
    let databaseResult = await getAll(fields);

    let normalizedDatabaseResult = databaseResult.map(dbRow => {
        return {
            fullName: dbRow.name.first + " " + dbRow.name.last,
            email: dbRow.email,
            memberType: dbRow.memberType?.name,
            program: dbRow.program,
            skills: dbRow.skills?.map(skill => skill?.name).join(),
            subteam: dbRow.subteams[0]?.name
        }
    });
    console.log("normalizedDatabaseResult *******************************");
    console.log(normalizedDatabaseResult);
    
    let excelSheetData = [['Full Name', 'Email', 'Member Type', 'Program', 'Skills', 'Subteams']];
    excelSheetData.push(...normalizedDatabaseResult.map(data => Object.values(data)));
    
    
    console.log("excelSheetData *******************************");
    console.log(excelSheetData);

    // TODO: call member.js -- members.getAll function to get the users' data
    // TODO: after you get the JSON response, you need to extract the relevant information, and format it so that it can be inputted into an Excel sheet

    
    const client = new OAuth2Client(authConfig['client_id']);
    client.setCredentials({
        access_token: token
    });
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    const request = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1vijuMLNCltfCWTEPAyxs47-MccvnvXI7wlC-ziS50Ys',  // TODO: Update placeholder value.
    
        // The A1 notation of the values to update.
        range: 'Sheet1',  // TODO: Update placeholder value.
    
        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
    
        resource: {
            values: excelSheetData
        },
        auth: client,
    };

    const response = await googleSheets.spreadsheets.values.update(request);
    return response;
}

module.exports = exportsheet;