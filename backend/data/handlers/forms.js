const FormSection = require('../schema/FormSection');
const Form = require('../schema/Form');
const util = require('./util');
// const {validateCorrectNumberOfOptions} = require('../../../util/validate');
const members = require('./members');
const _ = require('lodash');

const forms = {};

const validateCorrectNumberOfOptions = (sections) => {
    return sections.every((s) => {
        switch (s.type) {
            case 'checkbox':
            case 'radio':
            case 'menu_single':
            case 'menu_multi':
                return s.options && s.options.length > 1;
        }
        return true;
    });
};

/**
 * Fetch IDs and names of all Waterloop forms
 */
forms.getAllForms = async () => {
    return util.handleWrapper(async () => {
        return await Form.find({}).select({ _id: 1, name: 1 }).exec();
    });
};

/**
 * Fetch Form metadata.
 *
 * @param {String} formName: unique Name key of the form.
 */
forms.fetchFormData = async (formName) => {
    return util.handleWrapper(async () => {
        return Form.findOne({ name: formName })
            .select(['title', 'description', 'sections'])
            .populate({
                path: 'sections',
                populate: {
                    path: 'section',
                },
            });
    });
};

/**
 * Fetch Form and Waterloop Member's data
 *
 * @param {String} userId:   user ID
 * @param {String} formName: unique Name key of the form to get the data of
 */
forms.fetchFormAndMemberData = async (userId, formName) => {
    return util.handleWrapper(async () => {
        const response = {};
        response.form = await forms.fetchFormData(formName);

        const memberPropsToFetch = response.form.sections.map(
            (s) => s.section.name
        );
        memberPropsToFetch.push('miscDetails');
        const idx = memberPropsToFetch.indexOf('fullName');
        if (idx !== -1) {
            memberPropsToFetch[idx] = 'name';
        }
        const selectList = {};
        memberPropsToFetch.map((p) => {
            selectList[p] = 1;
        });
        let memberData = (await members.search({ _id: userId }, selectList))[0];
        if (memberData.miscDetails) {
            Object.keys(memberData.miscDetails)
                .filter(
                    (p) =>
                        p !== '_id' &&
                        p !== '__v' &&
                        memberPropsToFetch.includes(p)
                )
                .map((p) => {
                    memberData[p] = memberData.miscDetails[p];
                });
            delete memberData.miscDetails;
        }
        response.user = memberData;
        return response;
    });
};

/**
 * Create form sections/questions that don't already exist
 * Modify form sections/questions that exist (upsert)
 *
 * @param {Array[Object]} sections: details about the form sections/question to add.
 * @param {Array[Object]} res:      HTTP response object
 */
forms.updateFormSections = async (sections, res) => {
    if (!sections || sections.length === 0) {
        return;
    }

    if (!validateCorrectNumberOfOptions(sections)) {
        res.statusCode = 400;
        return Promise.reject(
            Error(
                'A form section has the wrong number of options. Ensure all Checkbox, Radio and Dropdown sections have 2 or more options configured.'
            )
        );
    }

    return util.handleWrapper(async () => {
        const dbPayload = sections.map((section) => {
            return {
                updateOne: {
                    filter: { name: section.name },
                    update: {
                        $set: _.omit(
                            section,
                            '_id',
                            'position',
                            'required',
                            'section'
                        ),
                    },
                    upsert: true,
                },
            };
        });
        return await FormSection.bulkWrite(dbPayload);
    });
};

/**
 * Add a new form.
 *
 * @param {Object} formData: form metadata
 * @param {Object} res: REST Response object
 */
forms.createForm = async (formData, res) => {
    return util.handleWrapper(async () => {
        await forms.updateFormSections(formData.sections, res); // TODO: this should be in a transaction.

        if (formData.sections) {
            const formSectionNamesToIds = await getFormSectionNamesToIdsMap();
            formData.sections = formData.sections.map((s) => {
                return {
                    required: s.required,
                    position: s.position,
                    section: formSectionNamesToIds[s.name],
                };
            });
        }

        try {
            await Form.create(formData);
        } catch (err) {
            console.error(err);
            const { title: titleFieldError, description: descFieldError } =
                err.errors;

            if (
                titleFieldError?.kind === 'required' ||
                descFieldError?.kind === 'required'
            ) {
                res.statusCode = 400;
                throw new Error('Title and Description cannot be blank.');
            }
            if (titleFieldError?.kind === 'unique') {
                res.statusCode = 400;
                throw new Error(
                    'Another form already exists with the title: ' +
                        titleFieldError.value +
                        '. Please enter a different title.'
                );
            }
            res.statusCode = 500;
            throw err;
        }
    });
};

/**
 * Update a form's metadata.
 *
 * @param {Object} formName: Unique name key of the form to update
 * @param {Object} formData: new metadata for the form.
 */
forms.updateFormMetadata = async (formName, formData, res) => {
    return util.handleWrapper(async () => {
        await forms.updateFormSections(formData.sections, res); // TODO: this should be in a transaction.

        if (formData.sections) {
            const formSectionNamesToIds = await getFormSectionNamesToIdsMap();
            const sectionNames = Object.keys(formSectionNamesToIds);
            formData.sections = formData.sections
                .filter((s) => sectionNames.includes(s.name))
                .map((s) => {
                    return {
                        required: s.required,
                        position: s.position,
                        section: formSectionNamesToIds[s.name],
                    };
                });
        }

        try {
            await Form.updateOne({ name: formName }, _.omit(formData, '_id'), {
                runValidators: true,
            });
        } catch (err) {
            console.error(err);
            const { title: titleFieldError, description: descFieldError } =
                err.errors;

            if (
                titleFieldError?.kind === 'required' ||
                descFieldError?.kind === 'required'
            ) {
                res.statusCode = 400;
                throw new Error('Title and Description cannot be blank.');
            }
            res.statusCode = 500;
            throw err;
        }
    });
};

const getFormSectionNamesToIdsMap = async () => {
    const formSections = await FormSection.find();
    const formSectionNamesToIds = {};
    formSections.map((s) => {
        formSectionNamesToIds[s.name] = s._id;
    });
    return formSectionNamesToIds;
};

module.exports = forms;
