const { OAuth2Client } = require('google-auth-library');
const Member = require('../schema/Member');
const authConfig = require('./auth.config.json');
const { google } = require('googleapis');
const { getAll: getAllMembersData } = require('./members');
const { fetchFormAndMemberData } = require('./forms');

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

googlesheets.writefile = async (userId, token, formName) => {
    return exportDataToGoogleSheets(userId, token, formName);
};

const exportDataToGoogleSheets = async (userId, token, formName) => {
    const formAndMemberData = await fetchFormAndMemberData(userId, formName);
    const headerText = formAndMemberData.form.sections.map(
        (section) => section.section.display
    );
    const memberData = await getFormsAndMembersData(formAndMemberData);
    console.log('memberData');
    console.log(memberData);
    const spreadsheetData = [headerText, ...memberData];

    return await createGoogleSheetsFile(
        formAndMemberData.form.title,
        spreadsheetData,
        token
    );
};

const getFormsAndMembersData = async (formAndMemberData) => {
    const fieldNamesToDataTypes = {};
    formAndMemberData.form.sections.map((section) => {
        fieldNamesToDataTypes[section.section.name] = section.section.type;
    });

    const memberFieldNames = new Set(
        Object.keys(Member.schema.paths).filter(
            (fieldName) => fieldName !== '_id' && fieldName !== '__v'
        )
    );
    let fieldsSelectList = new Set();
    const actualFieldNames = [];
    Object.keys(fieldNamesToDataTypes).map((fieldName) => {
        if (fieldName === 'fullName') {
            fieldsSelectList.add('name');
            actualFieldNames.push('fullName');
        } else if (memberFieldNames.has(fieldName)) {
            fieldsSelectList.add(fieldName);
            actualFieldNames.push(fieldName);
        } else {
            fieldsSelectList.add('miscDetails');
            actualFieldNames.push(fieldName);
        }
    });
    fieldsSelectList = getFields(fieldsSelectList);

    const formattedUserData = (await getAllMembersData(fieldsSelectList)).map(
        (member) => {
            const formattedValues = actualFieldNames.map((field) => {
                if (field === 'fullName') {
                    return member.name.first + ' ' + member.name.last;
                } else if (field === 'subteams') {
                    return member.subteams && member.subteams.length > 0
                        ? member.subteams
                              .map((subteam) => subteam.name)
                              .join(', ')
                        : '';
                } else if (field === 'skills') {
                    return member.skills && member.skills.length > 0
                        ? member.skills.map((skill) => skill.name).join(', ')
                        : '';
                } else if (field === 'memberType') {
                    return member.memberType?.name;
                }

                let rawValue;
                if (member[field]) {
                    rawValue = member[field];
                } else if (member.miscDetails && member.miscDetails[field]) {
                    rawValue = member.miscDetails[field];
                }
                if (rawValue === undefined || rawValue === null) {
                    return '';
                } else if (Array.isArray(rawValue)) {
                    return rawValue.join(', ');
                } else if (typeof rawValue === 'boolean') {
                    return rawValue ? 'Yes' : 'No';
                } else {
                    return rawValue;
                }
            });
            return formattedValues;
        }
    );
    return formattedUserData;
};

const createGoogleSheetsFile = async (formTitle, spreadsheetData, token) => {
    // Create new file using Google Drive API
    const currentDate = new Date();
    const fileName = `${formTitle} Responses - ${currentDate.toLocaleString(
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
