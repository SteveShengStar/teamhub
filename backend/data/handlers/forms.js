const UserDetails = require('../schema/UserDetails');
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
        return await Form.find({})
            .select({ _id: 1, name: 1, title: 1, imageSrc: 1, bulletPoints: 1 })
            .exec();
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
    const currentFormSectionIds = (
        await Form.findOne({ name: formName })
    ).sections.map((section) => section.section);
    const currentFormSectionNames = (
        await FormSection.find({
            _id: { $in: currentFormSectionIds },
        }).select(['name'])
    ).map((section) => section.name);
    const newFormSectionNames = formData.sections.map(
        (section) => section.name
    );

    const sectionsToDelete = _.difference(
        currentFormSectionNames,
        newFormSectionNames
    );
    const toDelete = {};
    sectionsToDelete.forEach((section) => {
        toDelete[section] = '';
    });
    await UserDetails.update(
        {},
        {
            $unset: toDelete,
        },
        {
            multi: true,
        }
    ).exec();

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

/**
 * Delete a form.
 *
 * @param {Object} formName: Unique name key of the form to update
 * @param {Object} formData: new metadata for the form.
 */
forms.deleteForm = async (formName, res) => {
    const sectionsOnDeletedForm = await Form.findOne(
        { name: formName },
        { sections: 1, _id: 0 }
    ).exec();
    const otherForms = await Form.find(
        { name: { $ne: formName } },
        { sections: 1, _id: 0 }
    ).exec();
    const otherFormSections = new Set(
        otherForms.reduce((acc, curr) => {
            return acc.concat(
                curr.sections.map((section) => section.section.toString())
            );
        }, [])
    );

    return util.handleWrapper(async () => {
        // formSections that are not in any other forms, must be deleted
        const sectionsToDelete = sectionsOnDeletedForm.sections
            .filter((value) => !otherFormSections.has(value.section.toString()))
            .map((formSection) => formSection.section);

        if (sectionsToDelete.length > 0) {
            const findQuery = sectionsToDelete.map((section) => {
                return { _id: section };
            });
            const sectionNamesToDelete = await FormSection.find({
                $or: findQuery,
            }).select({ name: 1, _id: 0 });

            const unsetQuery = {};
            sectionNamesToDelete.map((value) => (unsetQuery[value.name] = 1));

            // remove references to the deleted form sections in all UserDetails documents
            UserDetails.updateMany({}, { $unset: unsetQuery }, (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    throw err;
                }
            });

            FormSection.deleteMany(
                { _id: { $in: sectionsToDelete } },
                (err) => {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        throw err;
                    }
                }
            );
        }

        Form.deleteOne({ name: formName }, (err) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                throw err;
            }
        });
    });
};

module.exports = forms;
