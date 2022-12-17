// Fields to retrieve for populating the returning members form responses spreadsheet
const RETURNING_MEMBERS_FIELDS = [
    'name',
    'program',
    'bio',
    'skills',
    'interests',
    'memberType',
    'subteams',
    'projects',
    'email',
    'stream',
    'imageUrl',
    'links',
    'token',
    'tokenExpiry',
    'active',
    'miscDetails',
    'activeSchoolTerms',
];

// Headers/Titles for the returning members form responses spreadsheet
const RETURNING_MEMBERS_SPREADSHEET_HEADERS = [
    'Email',
    'This upcoming term, I will be in my',
    'Active Waterloop Terms',
    'Subteam',
    'Will you be active on the team this upcoming term?',
    "If you're continuing, what are you planning to do?",
    'Personal Email Address',
    'Any additional comments or thoughts on the term?',
    'Is there anything specific you want to work on next term?',
];

// Fields to retrieve for populating the team roster form responses spreadsheet
const TEAM_ROSTER_FIELDS = [
    'name',
    'program',
    'bio',
    'skills',
    'interests',
    'memberType',
    'subteams',
    'projects',
    'email',
    'stream',
    'imageUrl',
    'links',
    'token',
    'tokenExpiry',
    'active',
    'miscDetails',
    'activeSchoolTerms',
];

// Headers/Titles for the team roster form responses spreadsheet
const TEAM_ROSTER_SPREADSHEET_HEADERS = [
    'Full Name',
    'Email',
    'Phone number',
    'Membership',
    'Program',
    'Skills',
    'Subteam Membership',
    'On campus',
    'Active School Terms',
    'SSDC Code of Conduct',
    'WHMIS (send proof to your lead )',
    'Machine Shop Orientation',
];

const MEMBER_RESPONSES_FOLDER_ID = '1BvULMQjVfhPw8cTCp3P80C7d6OKadpC_'; // General/GENERAL/"Members' Form Responses"

module.exports = {
    RETURNING_MEMBERS_FIELDS,
    RETURNING_MEMBERS_SPREADSHEET_HEADERS,
    TEAM_ROSTER_FIELDS,
    TEAM_ROSTER_SPREADSHEET_HEADERS,
    MEMBER_RESPONSES_FOLDER_ID,
};
