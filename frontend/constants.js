/* Form questions that are required to be filled in */
export const USER_REGISTRATION_REQUIRED_FIELDS = [
    'fullName',
    'phoneNumber',
    'email',
    'program',
    'studentId',
    'termStatus',
    'memberType',
    'subteams',
    'designCentreSafety',
    'whimis',
    'machineShop',
];

/* Form Sections that cannot be edited or deleted by admins */
export const READ_ONLY_FORM_SECTIONS = ['fullName', 'personalEmail'];
