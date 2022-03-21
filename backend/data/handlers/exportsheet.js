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


    const fieldsToReturn = ["name", "program", "bio", "skills", "interests", "memberType", "subteams", "projects", "email", "stream", "imageUrl", "links", "token", "tokenExpiry", "active", "miscDetails", 'activeSchoolTerms']
    let fields = {};
    for (const field of fieldsToReturn) {
        fields[field] = 1;
    }
    let databaseResult = await getAll(fields); // All the teamhub members' information

    console.log("databaseResult *******************************");
    console.log(databaseResult[0]);
    console.log(databaseResult[1]);
    console.log(databaseResult[2]);
    
    // TODO: Get all this information from the database: 
    // Email Address	Name	Phone Number	Program	   On campus	Subteam  	SSDC Code of Conduct	WHMIS (send proof to your lead )	Machine Shop Orientation
    let normalizedDatabaseResult = databaseResult.map(dbRow => {
        return {
            fullName: dbRow.name.first + " " + dbRow.name.last,
            email: dbRow.email,
            phoneNumber: dbRow.miscDetails.phone ? dbRow.miscDetails.phone : '',
            memberType: dbRow.memberType?.name ? dbRow.memberType?.name : '',
            program: dbRow.program,
            skills: dbRow.skills?.map(skill => skill?.name).join(),
            subteam: dbRow.subteams[0]?.name,
            termStatus: dbRow.miscDetails.termStatus, 
            activeSchoolTerms: dbRow.activeSchoolTerms ? dbRow.activeSchoolTerms.join() : '',
            ssdc: dbRow.miscDetails.designCentreSafty ? 'yes' : 'no',
            whmis: dbRow.miscDetails.whmis ? 'yes' : 'no' , 
            machineShop: dbRow.miscDetails.machineShop ? 'yes' : 'no',
        }
    });
    console.log("normalizedDatabaseResult *******************************");
    console.log(normalizedDatabaseResult[0]);
    console.log(normalizedDatabaseResult[1]);
    console.log(normalizedDatabaseResult[2]);
    
    let excelSheetData = [['Full Name', 'Email', 'Phone number', 'Membership', 'Program', 'Skills', 'Subteam Membership', 'On campus', 'Active School Terms', 'joinSSDC Code of Conduct', 'WHMIS (send proof to your lead )', 'Machine Shop Orientation' ]];
    excelSheetData.push(...normalizedDatabaseResult.map(data => Object.values(data)));
    
    
    console.log("excelSheetData *******************************");
    console.log(excelSheetData[0]);
    console.log(excelSheetData[1]);
    console.log(excelSheetData[2]);

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

// PLEASE MODIFY THIS ONE
exportsheet.writeReturningMembers = async (token) => {


    const fieldsToReturn = ["name", "program", "bio", "skills", "interests", "memberType", "subteams", "projects", "email", "stream", "imageUrl", "links", "token", "tokenExpiry", "active", "miscDetails", 'activeSchoolTerms']
    let fields = {};
    for (const field of fieldsToReturn) {
        fields[field] = 1;
    }
    let databaseResult = await getAll(fields); // All the teamhub members' information

    console.log("databaseResult *******************************");
    console.log(databaseResult[0]);
    console.log(databaseResult[1]);
    console.log(databaseResult[2]);
    
    // TODO: Get all this information from the database: 
    // Email Address	Name	Phone Number	Program	   On campus	Subteam  	SSDC Code of Conduct	WHMIS (send proof to your lead )	Machine Shop Orientation
    let normalizedDatabaseResult = databaseResult.map(dbRow => {
        return {
            // email: dbRow.email ? dbRow.email  : '',
            // upcomingTerm: dbRow.miscDetails.nextSchoolTerm ? dbRow.miscDetails.nextSchoolTerm : '', 
            // activeSchoolTerms: dbRow.activeSchoolTerms ? dbRow.activeSchoolTerms.join() : '',
            // subteam: dbRow.subteams[0]?.name ? dbRow.subteams[0].name : '',
            // nextTermActivity: dbRow.miscDetails.nextTermActivity ? dbRow.miscDetails.nextTermActivity : '', 
            // nextTermRole: dbRow.miscDetails.nextTermRole ? dbRow.miscDetails.nextTermRole : '', 
            // personalEmail: dbRow.miscDetails.personalEmail ? dbRow.miscDetails.personalEmail : '', 
            // termComments: dbRow.miscDetails.termComments ? dbRow.miscDetails.termComments : '', 
            // desiredWork: dbRow.miscDetails.desiredWork ? dbRow.miscDetails.desiredWork : '', 
            email: dbRow.email ? dbRow.email  : '',
            upcomingTerm: dbRow.miscDetails.nextSchoolTerm ? dbRow.miscDetails.nextSchoolTerm : '', 
            activeSchoolTerms: dbRow.activeSchoolTerms ? dbRow.activeSchoolTerms.join() : '',
            subteam: dbRow.subteams[0]?.name ? dbRow.subteams[0].name : '',
            nextTermActivity: dbRow.miscDetails.nextTermActivity ? dbRow.miscDetails.nextTermActivity : '', 
            nextTermRole: dbRow.miscDetails.nextTermRole ? dbRow.miscDetails.nextTermRole : '', 
            personalEmail: dbRow.miscDetails.personalEmail ? dbRow.miscDetails.personalEmail : '', 
            termComments: dbRow.miscDetails.termComments ? dbRow.miscDetails.termComments : '', 
            desiredWork: dbRow.miscDetails.desiredWork ? dbRow.miscDetails.desiredWork : '', 
        }
    });
    console.log("normalizedDatabaseResult *******************************");
    console.log(normalizedDatabaseResult[0]);
    console.log(normalizedDatabaseResult[1]);
    console.log(normalizedDatabaseResult[2]);
    
    let excelSheetData = [['Email',  'This upcoming term, I will be in my', 'Active Waterloop Terms', 'Subteam', 'Will you be active on the team this upcoming term?', 'If you\'re continuing, what are you planning to do?', 'Personal Email Address', 'Any additional comments or thoughts on the term?', 'Is there anything specific you want to work on next term?']];
    excelSheetData.push(...normalizedDatabaseResult.map(data => Object.values(data)));
    
    
    console.log("excelSheetData *******************************");
    console.log(excelSheetData[0]);
    console.log(excelSheetData[1]);
    console.log(excelSheetData[2]);

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
        range: 'Sheet2',  // TODO: Update placeholder value.
    
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