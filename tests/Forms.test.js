global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

jest.setTimeout(15000);

const data = require('../backend/data/index');
const FormSection = require('../backend/data/schema/FormSection');
const Form = require('../backend/data/schema/Form');
const Member = require('../backend/data/schema/Member');
const UserDetails = require('../backend/data/schema/UserDetails');
const _ = require('lodash');

// TODO: extract into a util file.
const addTestMember = async (testData) => {
    const memberFields = Object.keys(Member.schema.paths);
    let userSummary = _.omit(_.pick(testData, memberFields), "_id");
    let userDetails = _.omit(testData, [...memberFields, "_id"]);

    const userDetailsResponse = await UserDetails.create(userDetails);
    userSummary.miscDetails = userDetailsResponse._id;
    userSummary = await data.members.replacePayloadWithIds(userSummary);
    return await Member.create(userSummary);
};

beforeAll(async () => {
    await data.initIfNotStarted();
});

afterAll(() => {
    data.close();
});

afterEach(async () => {
    await Member.deleteMany({});
    await UserDetails.deleteMany({});
    await Form.deleteMany({});
    await FormSection.deleteMany({});
});

describe('Forms Unit Tests', () => {
    describe('Fetch Form Metadata and associated Member Data', () => {
        const memberData = {
            name: {
                'first': 'Sarah807',
                'last': 'Davidson1235',
            },
            email: 'sarah.davidson@waterloop-domain.ca',
            phone: "9074957323",
            personalEmail: "sarah.davidson@gmail.com",
            studentId: "84563053",
            termStatus: "Not active on Waterloop this term",
            nextTermActivity: "No, taking the term off",
            nextTermRole: "Want to become a co-op",
            nextSchoolTerm: "3A Co-op",
            termComments: "The documentation was very easy to follow and well put together.",
            designCentreSafety: false
        };
        const formSections = [
            {
                "name": "fullName",
                "display": "Full Name",
                "errorText": "Please enter your full name.",
                "options": [],
                "type": "text"
            },
            {
                "name": "phoneNumber",
                "display": "Phone Number",
                "errorText": "Please enter a valid 10 digit phone number.",
                "options": [],
                "type": "phone"
            },
            {
                "name": "personalEmail",
                "display": "Personal Email Address",
                "errorText": "Please enter a valid email.",
                "options": [],
                "type": "text"
            },
            {
                "name": "studentId",
                "display": "Student ID No.",
                "errorText": "Student ID must have 8 digits.",
                "options": [],
                "type": "numbers"
            },
            {
                "name": "termStatus",
                "display": "Which describes you best?",
                "errorText": "Please select an option above.",
                "options": ["Academic term, active on Waterloop in-person", "Academic term, active on Waterloop remotely", "Co-op term, working on Waterloop remotely", "Co-op term, active on Waterloop in-person", "Not active on Waterloop this term", "Other"],
                "type": "radio"
            },
            {
                "name": "subteams",
                "display": "Subteam",
                "errorText": "Please select an option above.",
                "options": ["Software", "Electrical", "Mechanical", "Admin", "Infrastructure", "Exec", "Web"],
                "type": "radio"
            },
            {
                "name": "designCentreSafety",
                "display": "Student Design Center Safety Requirements",
                "errorText": "Please select an option above.",
                "options": [],
                "type": "boolean"
            },
            {
                "name": "nextTermActivity",
                "display": "Will you be active on the team this upcoming term?",
                "errorText": "Please select an option above.",
                "options": ["Yes, I will continue on the team, and I will be on campus (or working locally)", "Yes, I will continue on the team remotely and can come to campus if needed/possible", "Yes, I will continue on the team remotely only", "Undecided or unsure", "No, taking the term off"],
                "type": "radio"
            },
            {
                "name": "nextTermRole",
                "display": "If you're continuing, what are you planning to do?",
                "errorText": "Please select an option above.",
                "options": ["Continue with my sub-team", "Transfer to another sub-team (please specify)", "Want to take on a leadership role - lead", "Want to take on a leadership role - co-op supervisor", "Want to become a co-op", "I'm undecided or not continuing"],
                "type": "radio"
            }
        ];

        it('Test No. 1', async () => {
            const userResp = await addTestMember(memberData);
            await FormSection.insertMany(formSections);

            const {_id: nameSectionId} = await FormSection.findOne({name: 'fullName'});
            const {_id: phoneSectionId} = await FormSection.findOne({name: 'phoneNumber'});
            const {_id: nextTermActivitySectionId} = await FormSection.findOne({name: 'nextTermActivity'});
            const {_id: nextTermRoleSectionId} = await FormSection.findOne({name: 'nextTermRole'});
            const formData = {
                title: "Returning Members Form",
                description: "Returning Members Form Description",
                name: "returning",
                sections: [
                    {
                        "section": nameSectionId,
                        "position": 0,
                        "required": true,
                    }, {
                        "section": phoneSectionId,
                        "position": 1,
                        "required": true
                    }, {
                        "section": nextTermActivitySectionId,
                        "position": 2,
                        "required": false
                    }, {
                        "section": nextTermRoleSectionId,
                        "position": 3,
                        "required": false
                    },
                ]
            };
            const formResp = await Form.create(formData);
            const userId = userResp._id;
            const formId = formResp._id;
            const {form, user} = await data.forms.fetchFormAndMemberData(userId, formId);

            expect(form._id).toBeTruthy();
            expect(form.title).toBe("Returning Members Form");
            expect(form.description).toBe("Returning Members Form Description");
            expect(form.sections.length).toBe(4);
            expect(form.sections[0]).toMatchObject({
                position: 0,
                required: true,
                section: {
                    "name": "fullName",
                    "display": "Full Name",
                    "errorText": "Please enter your full name.",
                    "options": [],
                    "type": "text"
                }
            });
            expect(form.sections[1]).toMatchObject({
                position: 1,
                required: true,
                section: {
                    "name": "phoneNumber",
                    "display": "Phone Number",
                    "errorText": "Please enter a valid 10 digit phone number.",
                    "options": [],
                    "type": "phone"
                }
            });
            expect(form.sections[2]).toMatchObject({
                position: 2,
                required: false,
                section: {
                    "name": "nextTermActivity",
                    "display": "Will you be active on the team this upcoming term?",
                    "errorText": "Please select an option above.",
                    "options": ["Yes, I will continue on the team, and I will be on campus (or working locally)", "Yes, I will continue on the team remotely and can come to campus if needed/possible", "Yes, I will continue on the team remotely only", "Undecided or unsure", "No, taking the term off"],
                    "type": "radio"
                }
            });
            expect(form.sections[3]).toMatchObject({
                position: 3,
                required: false,
                section: {
                    "name": "nextTermRole",
                    "display": "If you're continuing, what are you planning to do?",
                    "errorText": "Please select an option above.",
                    "options": ["Continue with my sub-team", "Transfer to another sub-team (please specify)", "Want to take on a leadership role - lead", "Want to take on a leadership role - co-op supervisor", "Want to become a co-op", "I'm undecided or not continuing"],
                    "type": "radio"
                }
            });

            expect(user._id).toBeTruthy();
            expect(user).toMatchObject({
                name: {
                    first: 'Sarah807',
                    last: 'Davidson1235',
                },
                nextTermActivity: 'No, taking the term off',
                nextTermRole: 'Want to become a co-op'
            });
        });

        it('Test No. 2', async () => {
            const userResp = await addTestMember(memberData);
            await FormSection.insertMany(formSections);

            const {_id: nameSectionId} = await FormSection.findOne({name: 'fullName'});
            const {_id: phoneSectionId} = await FormSection.findOne({name: 'phoneNumber'});
            const {_id: personalEmailSectionId} = await FormSection.findOne({name: 'personalEmail'});
            const {_id: studentIdSectionId} = await FormSection.findOne({name: 'studentId'});
            const {_id: termStatusSectionId} = await FormSection.findOne({name: 'termStatus'});
            const {_id: subteamsSectionId} = await FormSection.findOne({name: 'subteams'});
            const {_id: designCentreSafetySectionId} = await FormSection.findOne({name: 'designCentreSafety'});

            const formData = {
                title: "Registration Form",
                description: "Registration Form - A short blurb to describe this form",
                name: "register",
                sections: [
                    {
                        "section": nameSectionId,
                        "position": 0,
                        "required": true,
                    }, {
                        "section": phoneSectionId,
                        "position": 1,
                        "required": true
                    }, {
                        "section": personalEmailSectionId,
                        "position": 2,
                        "required": true
                    }, {
                        "section": studentIdSectionId,
                        "position": 3,
                    }, {
                        "section": termStatusSectionId,
                        "position": 4,
                        "required": true
                    }, {
                        "section": subteamsSectionId,
                        "position": 5,
                    }, {
                        "section": designCentreSafetySectionId,
                        "position": 6,
                        "required": true
                    },
                ]
            };
            const formResp = await Form.create(formData);
            const userId = userResp._id;
            const formId = formResp._id;
            const {form, user} = await data.forms.fetchFormAndMemberData(userId, formId);

            expect(form._id).toBeTruthy();
            expect(form.title).toBe("Registration Form");
            expect(form.description).toBe("Registration Form - A short blurb to describe this form");
            expect(form.sections.length).toBe(7);
            expect(form.sections[0]).toMatchObject({
                position: 0,
                required: true,
                section: {
                    "name": "fullName",
                    "display": "Full Name",
                    "errorText": "Please enter your full name.",
                    "options": [],
                    "type": "text"
                }
            });
            expect(form.sections[1]).toMatchObject({
                position: 1,
                required: true,
                section: {
                    "name": "phoneNumber",
                    "display": "Phone Number",
                    "errorText": "Please enter a valid 10 digit phone number.",
                    "options": [],
                    "type": "phone"
                }
            });
            expect(form.sections[2]).toMatchObject({
                position: 2,
                required: true,
                section: {
                    "name": "personalEmail",
                    "display": "Personal Email Address",
                    "errorText": "Please enter a valid email.",
                    "options": [],
                    "type": "text"
                },
            });
            expect(form.sections[3]).toMatchObject({
                position: 3,
                required: false,
                section: {
                    "name": "studentId",
                    "display": "Student ID No.",
                    "errorText": "Student ID must have 8 digits.",
                    "options": [],
                    "type": "numbers"
                },
            });
            expect(form.sections[4]).toMatchObject({
                position: 4,
                required: true,
                section: {
                    "name": "termStatus",
                    "display": "Which describes you best?",
                    "errorText": "Please select an option above.",
                    "options": ["Academic term, active on Waterloop in-person", "Academic term, active on Waterloop remotely", "Co-op term, working on Waterloop remotely", "Co-op term, active on Waterloop in-person", "Not active on Waterloop this term", "Other"],
                    "type": "radio"
                }
            });
            expect(form.sections[5]).toMatchObject({
                position: 5,
                required: false,
                section: {
                    "name": "subteams",
                    "display": "Subteam",
                    "errorText": "Please select an option above.",
                    "options": ["Software", "Electrical", "Mechanical", "Admin", "Infrastructure", "Exec", "Web"],
                    "type": "radio"
                }
            });
            expect(form.sections[6]).toMatchObject({
                position: 6,
                required: true,
                section: {
                    "name": "designCentreSafety",
                    "display": "Student Design Center Safety Requirements",
                    "errorText": "Please select an option above.",
                    "options": [],
                    "type": "boolean"
                }
            });

            expect(user._id).toBeTruthy();
            expect(user).toMatchObject({
                name: {
                    first: 'Sarah807',
                    last: 'Davidson1235',
                },
                subteams: [],
                personalEmail: "sarah.davidson@gmail.com",
                studentId: 84563053,
                termStatus: "Not active on Waterloop this term",
                designCentreSafety: false 
            });
        });
    });

    describe('Update Form Sections', () => {
        it("Test Update Success", async () => {
            const formSections = [
                {
                    '_id': '62cb8595699c7050d02c4c24', 
                    'position': 0,
                    'required': true,
                    'section': {"name": "fullName"},
                    "name": "fullName",
                    "display": "Full Name",
                    "errorText": "Please enter your full name.",
                    "options": [],
                    "type": "text"
                },
                {
                    '_id': '62cb8595699c7050d02c4c25', 
                    'position': 1,
                    'required': true,
                    'section': {"name": "phoneNumber"},
                    "name": "phoneNumber",
                    "display": "Phone Number",
                    "errorText": "Please enter a valid 10 digit phone number.",
                    "type": "phone"
                },
                {
                    '_id': '62cb8595699c7050d02c4c26', 
                    'position': 2,
                    'required': false,
                    'section': {"name": "studentId"},
                    "name": "studentId",
                    "display": "Student ID No.",
                    "errorText": "Student ID must have 8 digits.",
                    "type": "numbers"
                },
                {
                    '_id': '62cb8595699c7050d02c4c29', 
                    'position': 3,
                    'required': false,
                    'section': {"name": "termStatus"},
                    "name": "termStatus",
                    "display": "Which describes you best?",
                    "errorText": "Please select an option above.",
                    "options": ["Academic term, active on Waterloop in-person", "Academic term, active on Waterloop remotely", "Co-op term, working on Waterloop remotely", "Co-op term, active on Waterloop in-person", "Not active on Waterloop this term", "Other"],
                    "type": "radio"
                },
                {
                    '_id': '62cb8595699c7050d02c4c2a', 
                    'position': 4,
                    'required': false,
                    'section': {"name": "subteams"},
                    "name": "subteams",
                    "display": "Subteam",
                    "errorText": "Please select an option above.",
                    "options": ["Software", "Electrical", "Mechanical", "Admin", "Infrastructure", "Exec", "Web"],
                    "type": "radio"
                },
                {
                    '_id': '62cb8595699c7050d02c4c2e', 
                    'position': 5,
                    'required': true,
                    'section': {"name": "designCentreSafety"},
                    "name": "designCentreSafety",
                    "display": "Student Design Center Safety Requirements",
                    "errorText": "Please select an option above.",
                    "type": "boolean"
                },
                {
                    '_id': '62cb8595699c7050d02c4c2f', 
                    'position': 6,
                    'required': true,
                    'section': {"name": "nextTermActivity"},
                    "name": "nextTermActivity",
                    "display": "Will you be active on the team this upcoming term?",
                    "errorText": "Please select an option above.",
                    "options": ["Yes, I will continue on the team, and I will be on campus (or working locally)", "Yes, I will continue on the team remotely and can come to campus if needed/possible", "Yes, I will continue on the team remotely only", "Undecided or unsure", "No, taking the term off"],
                    "type": "radio"
                },
            ];
            const res = {statusCode: 200};

            await data.forms.updateFormSections(formSections, res);

            const fetchedFormSections = (await FormSection.find().lean()).map(section => _.omit(section, "_id"));  // Strip away the _id property
            expect(res.statusCode).toBe(200);
            expect(fetchedFormSections.length).toBe(7);
            expect(fetchedFormSections[0]).toStrictEqual(
                {
                    "name": "fullName",
                    "display": "Full Name",
                    "errorText": "Please enter your full name.",
                    "options": [],
                    "type": "text"
                },
            );
            expect(fetchedFormSections[1]).toStrictEqual(
                {
                    "name": "phoneNumber",
                    "display": "Phone Number",
                    "errorText": "Please enter a valid 10 digit phone number.",
                    "options": [],
                    "type": "phone"
                }
            );
            expect(fetchedFormSections[2]).toStrictEqual(
                {
                    "name": "studentId",
                    "display": "Student ID No.",
                    "errorText": "Student ID must have 8 digits.",
                    "options": [],
                    "type": "numbers"
                }
            );
            expect(fetchedFormSections[3]).toStrictEqual(
                {
                    "name": "termStatus",
                    "display": "Which describes you best?",
                    "errorText": "Please select an option above.",
                    "options": ["Academic term, active on Waterloop in-person", "Academic term, active on Waterloop remotely", "Co-op term, working on Waterloop remotely", "Co-op term, active on Waterloop in-person", "Not active on Waterloop this term", "Other"],
                    "type": "radio"
                }
            );
            expect(fetchedFormSections[4]).toStrictEqual(
                {
                    "name": "subteams",
                    "display": "Subteam",
                    "errorText": "Please select an option above.",
                    "options": ["Software", "Electrical", "Mechanical", "Admin", "Infrastructure", "Exec", "Web"],
                    "type": "radio"
                }
            );
            expect(fetchedFormSections[5]).toStrictEqual(
                {
                    "name": "designCentreSafety",
                    "display": "Student Design Center Safety Requirements",
                    "errorText": "Please select an option above.",
                    "options": [],
                    "type": "boolean"
                }
            );
            expect(fetchedFormSections[6]).toStrictEqual(
                {
                    "name": "nextTermActivity",
                    "display": "Will you be active on the team this upcoming term?",
                    "errorText": "Please select an option above.",
                    "options": ["Yes, I will continue on the team, and I will be on campus (or working locally)", "Yes, I will continue on the team remotely and can come to campus if needed/possible", "Yes, I will continue on the team remotely only", "Undecided or unsure", "No, taking the term off"],
                    "type": "radio"
                }
            );
        });
    });

    describe('Create New Form', () => {
        it("Create Success - Update Existing Form Sections", async () => {
            const formSections = [
                {
                    "name": "fullName",
                    "display": "Full Name",
                    "errorText": "Please enter your full name.",
                    "options": [],
                    "type": "text"
                },
                {
                    "name": "phoneNumber",
                    "display": "Phone Number",
                    "errorText": "Please enter a valid 10 digit phone number.",
                    "type": "phone"
                },
            ];
            await FormSection.insertMany(formSections);

            const formData = {
                title: "Sign Up Form",
                description: "Sign Up Form - A short blurb to describe this form",
                name: "signup",
                sections: [
                    {
                        "name": 'fullName',
                        "display": "Enter your First and Last Name",
                        "errorText": "Please Enter your First and Last Name",
                        "type": "text",
                        "position": 0,
                        "required": true,
                    }, 
                    {
                        "name": 'phoneNumber',
                        "display": "Enter your Phone Number",
                        "errorText": "You must Enter your Phone Number",
                        "type": "numbers",
                        "position": 1,
                        "required": false,
                    },
                    {
                        "name": "subteams",
                        "display": "Subteam",
                        "errorText": "Please select an option.",
                        "options": ["Software", "Electrical", "Mechanical", "Admin", "Infrastructure", "Exec", "Web"],
                        "type": "radio",
                        'position': 2,
                        'required': false,
                    },
                    {
                        "name": "designCentreSafety",
                        "display": "Student Design Center Safety Requirements",
                        "errorText": "Please select an option.",
                        "type": "boolean",
                        'position': 3,
                        'required': true,
                    },
                ]
            };
            const res = {statusCode: 200};

            await data.forms.createForm(formData, res);

            const fetchedFormSections = (await FormSection.find().lean()).map(section => _.omit(section, "_id", "__v"));  // Strip away the _id property
            const fetchedFormData = await Form.findOne({name: 'signup'}).lean();
            expect(res.statusCode).toBe(200);
            expect(fetchedFormSections.length).toBe(4);
            expect(fetchedFormSections[0]).toStrictEqual({
                "name": 'fullName',
                "display": "Enter your First and Last Name",
                "errorText": "Please Enter your First and Last Name",
                "type": "text",
                "options": [],
            });
            expect(fetchedFormSections[1]).toStrictEqual({
                "name": 'phoneNumber',
                "display": "Enter your Phone Number",
                "errorText": "You must Enter your Phone Number",
                "type": "numbers",
                "options": [],
            });
            expect(fetchedFormSections[2]).toStrictEqual({
                "name": "subteams",
                "display": "Subteam",
                "errorText": "Please select an option.",
                "options": ["Software", "Electrical", "Mechanical", "Admin", "Infrastructure", "Exec", "Web"],
                "type": "radio",
            });
            expect(fetchedFormSections[3]).toStrictEqual({
                "name": "designCentreSafety",
                "display": "Student Design Center Safety Requirements",
                "errorText": "Please select an option.",
                "type": "boolean",
                "options": [],
            });
            expect(fetchedFormData).toMatchObject({
                title: "Sign Up Form",
                description: "Sign Up Form - A short blurb to describe this form",
                name: "signup",
                sections: [
                    {
                        "position": 0,
                        "required": true,
                    }, 
                    {
                        "position": 1,
                        "required": false,
                    }, 
                    {
                        "position": 2,
                        "required": false,
                    }, 
                    {
                        "position": 3,
                        "required": true,
                    }, 
                ]
            });
        });
    });

    describe('Update Form Data', () => {
        it("Update Success - Update Existing Form Sections", async () => {
            const formSections = [
                {
                    "name": "fullName",
                    "display": "Full Name",
                    "errorText": "Please enter your full name.",
                    "options": [],
                    "type": "text"
                },
                {
                    "name": "phoneNumber",
                    "display": "Phone Number",
                    "errorText": "Please enter a valid 10 digit phone number.",
                    "type": "phone"
                },
            ];
            await FormSection.insertMany(formSections);

            const {_id: nameSectionId} = await FormSection.findOne({name: 'fullName'});
            const {_id: phoneSectionId} = await FormSection.findOne({name: 'phoneNumber'});
            const initialFormData = {
                title: "Beginning of Term Form",
                description: "Beginning of Term Form - Short Descri.",
                name: "bot",
                sections: [
                    {
                        "position": 0,
                        "required": false,
                        "section": nameSectionId,
                    },
                    {
                        "position": 1,
                        "required": true,
                        "section": phoneSectionId,
                    },
                ]
            };
            const {_id: formId} = await Form.create(initialFormData);

            const updatedFormData = {
                title: "Sign Up Form",
                description: "Sign Up Form - A short blurb to describe this form",
                // TODO: should I make the name field read-only ? What if I try to update this name field, will it succeed ?
                sections: [
                    {
                        "name": "subteams",
                        "display": "Subteam",
                        "errorText": "Please select an option.",
                        "options": ["Software", "Electrical", "Mechanical", "Admin", "Infrastructure", "Exec", "Web"],
                        "type": "radio",
                        'position': 0,
                        'required': false,
                    },
                    {
                        "name": "designCentreSafety",
                        "display": "Student Design Center Safety Requirements",
                        "errorText": "Please select an option.",
                        "type": "boolean",
                        'position': 1,
                        'required': true,
                    },
                    {
                        "name": 'fullName',
                        "display": "Enter your First and Last Name",
                        "errorText": "Please Enter your First and Last Name",
                        "type": "longtext",
                        "position": 2,
                        "required": true,
                    },
                ]
            };
            const res = {statusCode: 200};

            await data.forms.updateFormMetadata(formId.toString(), updatedFormData, res);

            let fetchedFormSections = (await FormSection.find().lean());
            const subteamSectionId = fetchedFormSections.find(s => s.name === 'subteams')._id.toString();
            const designCentreSafetySectionId = fetchedFormSections.find(s => s.name === 'designCentreSafety')._id.toString();
            const nameSectionId_Final = fetchedFormSections.find(s => s.name === 'fullName')._id.toString();

            fetchedFormSections = fetchedFormSections.map(section => _.omit(section, "_id", "__v"));  // Strip away the _id property
            let fetchedFormData = await Form.findOne({name: 'bot'}).lean();
            fetchedFormData.sections = fetchedFormData.sections.map(
                s => {
                    return {
                        ...s,
                        section: s.section.toString()
                    }
                }
            );
            
            expect(res.statusCode).toBe(200);
            expect(fetchedFormSections.length).toBe(4);
            expect(fetchedFormSections[0]).toStrictEqual({
                "name": 'fullName',
                "display": "Enter your First and Last Name",
                "errorText": "Please Enter your First and Last Name",
                "options": [],
                "type": "longtext",
            });
            expect(fetchedFormSections[1]).toStrictEqual({
                "name": "phoneNumber",
                "display": "Phone Number",
                "errorText": "Please enter a valid 10 digit phone number.",
                "options": [],
                "type": "phone"
            });
            expect(fetchedFormSections[2]).toStrictEqual({
                "name": "subteams",
                "display": "Subteam",
                "errorText": "Please select an option.",
                "options": ["Software", "Electrical", "Mechanical", "Admin", "Infrastructure", "Exec", "Web"],
                "type": "radio",
            });
            expect(fetchedFormSections[3]).toStrictEqual({
                "name": "designCentreSafety",
                "display": "Student Design Center Safety Requirements",
                "errorText": "Please select an option.",
                "options": [],
                "type": "boolean",
            });
            expect(fetchedFormData).toMatchObject({
                title: "Sign Up Form",
                description: "Sign Up Form - A short blurb to describe this form",
                name: "bot",
                sections: [
                    {
                        'position': 0,
                        'required': false,
                        "section": subteamSectionId
                    },
                    {
                        'position': 1,
                        'required': true,
                        "section": designCentreSafetySectionId
                    },
                    {
                        "position": 2,
                        "required": true,
                        "section": nameSectionId_Final
                    }
                ]
            });
        });
    });
});