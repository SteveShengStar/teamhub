import { isEmail } from 'validator';
import { validate as isUuid } from 'uuid';

export const removeDuplicates = (array) => {
    const uniqueSet = new Set(array.map((i) => i.trim().toLowerCase()));
    return [...uniqueSet].filter((i) => i);
};

export const formatFormValues = (formValues) => {
    const fullNameParts = formValues.fullName
        ? formValues.fullName.split(/(\s+)/).filter((e) => e.trim().length > 0)
        : ['', ''];
    return {
        ...formValues,
        name: {
            first: fullNameParts[0].trim(),
            last: fullNameParts[fullNameParts.length - 1].trim(),
        },
    };
};

// form validation utility methods
export const validateFields = (formValues, sectionMetadataByName) => {
    const validationResult = {};
    Object.keys(sectionMetadataByName).map((sectionName) => {
        const { type: dataType, required } = sectionMetadataByName[sectionName];
        const value = formValues[sectionName];

        if (required) {
            const validationPassed = validateNotEmpty(value);
            if (!validationPassed) {
                validationResult[sectionName] = false;
                return;
            }
        }

        switch (dataType) {
            case 'email':
                validationResult[sectionName] = validateEmail(value);
                break;
            case 'numbers':
                validationResult[sectionName] = validateNumber(value);
                break;
            case 'phone':
                validationResult[sectionName] = validateNumber(value, 10);
                break;
            case 'boolean':
                validationResult[sectionName] = validateBoolean(value);
                break;
        }
    });
    return validationResult;
};

export const clearErrorMessageIfExists = (fieldName, hasError, setHasError) => {
    if (hasError[fieldName]) {
        setHasError({
            ...hasError,
            [fieldName]: false,
        });
    }
};

export const clearErrorMessages = (formErrors) => {
    for (const field of Object.keys(formErrors)) {
        formErrors[field] = false;
    }
};

export const isInvalidPhoneNumber = (number) => {
    return !number.match(/^[0-9]*$/) || number.length > 10;
};

export const isInvalidStudentId = (number) => {
    return !number.match(/^[0-9]*$/) || number.length > 8;
};

// Custom Form Field names are V4 UUIDs
export const getCustomFields = (formValues) => {
    const customFieldMap = {};
    for (const [field, value] of Object.entries(formValues)) {
        if (isUuid(field)) {
            customFieldMap[field] = value;
        }
    }
    return customFieldMap;
};

// Get Default Values for Form Fields based on Field Type
export const getFieldDefaultValues = (formSections) => {
    const defaultVals = {};
    formSections.forEach((section) => {
        switch (section.type) {
            case 'text':
            case 'longtext':
            case 'numbers':
            case 'phone':
            case 'menu_single':
            case 'menu_multi':
            case 'checkbox':
            case 'radio':
                defaultVals[section.name] = '';
                break;
            case 'boolean':
                defaultVals[section.name] = false;
                break;
        }
    });
    return defaultVals;
};

export const initHasErrorsToFalse = (formSections) => {
    const hasError = {};
    formSections.forEach((section) => {
        hasError[section.name] = false;
    });
    return hasError;
};

export const scrollToFirstError = (formSections, formErrors) => {
    let minIndex = Number.MAX_VALUE;
    for (const [sectionName, hasError] of Object.entries(formErrors)) {
        if (hasError) {
            const idx = formSections.findIndex(
                (section) => section.name === sectionName
            );
            if (idx !== -1 && idx < minIndex) {
                minIndex = idx; // Update the minimum index.
            }
        }
    }

    if (minIndex === Number.MAX_VALUE) {
        return;
    }

    const scrollToSectionName = formSections[minIndex].name;
    const element = document.getElementById(scrollToSectionName);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    }
};

const validateNotEmpty = (value) => {
    if (Array.isArray(value)) {
        return value && value.length > 0;
    }

    return value?.trim() ? true : false;
};

const validateNumber = (value, digitsRequired) => {
    if (
        !value ||
        typeof value !== 'string' ||
        !value.match(/^[0-9]*$/) ||
        (digitsRequired && value.length !== digitsRequired)
    ) {
        return false;
    }
    return true;
};

const validateBoolean = (value) => {
    return typeof value === 'boolean';
};

const validateName = (value) => {
    if (
        typeof value !== 'string' ||
        !value?.trim() ||
        value.trim().split(/\s+/).length < 2
    ) {
        return false;
    }
    return true;
};

const validateEmail = (value) => {
    if (typeof value !== 'string' || !value?.trim() || !isEmail(value.trim())) {
        return false;
    }
    return true;
};
