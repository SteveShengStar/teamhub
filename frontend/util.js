import { isEmail } from 'validator';
import { validate as isUuid } from 'uuid';

export const removeBadValuesAndDuplicates = (array) => {
    const uniqueSet = new Set(array.map(i => i.trim().toLowerCase()))
    return [...uniqueSet].filter(i => i);
}

// form validation utility methods
export const validateField = (formData, formErrors, field) => {
    switch(field) {
        case 'fullName':
            validateName(formData, formErrors, field);
            break;
        case 'personalEmail':
            validateEmail(formData, formErrors, field);
            break;
        case 'studentId':
            validateNumber(formData, formErrors, field, 8);
            break;
        case 'phoneNumber':
            validateNumber(formData, formErrors, field, 10);
            break;
        case 'designCentreSafety':
        case 'whmis':
        case 'machineShop':
            validateBoolean(formData, formErrors, field);
            break;
        case 'termDescription':
        case 'subteams':
        case 'nextTermRole':
        case 'nextTermActivity':
        case 'program':
        case 'termStatus':
        case 'memberType':
        case 'nextSchoolTerm':
        case 'nextTermRole':
        case 'nextTermActivity':
            validateExists(formData, formErrors, field);
            break;
    }
}

export const clearErrorMessages = (formErrors) => {
    for (const field of Object.keys(formErrors)) {
        formErrors[field] = false;
    }
}

export const isInvalidPhoneNumber = (number) => {
    return !number.match(/^[0-9]*$/) || number.length > 10;
}

export const isInvalidStudentId = (number) => {
    return !number.match(/^[0-9]*$/) || number.length > 8;
}

// Custom Form Field names are V4 UUIDs
export const getCustomFields = (formValues) => {
    const customFieldMap = {};
    for (const [field, value] of Object.entries(formValues)) {
        if (isUuid(field)) {
            customFieldMap[field] = value;
        }
    }
    return customFieldMap;
}

// Get Default Values for Form Fields based on Field Type
export const getCustomFieldDefaults = (formSections) => {
    const defaultVals = {};
    const customFieldSections = formSections.filter(section => isUuid(section.name));
    customFieldSections.forEach(section => {
        switch (section.type) {
            case "text": 
            case "longtext": 
            case "numbers": 
            case "phone": 
            case "menu_single":
            case "menu_multi":
            case "checkbox":
            case "radio":
                defaultVals[section.name] = '';
                break;
            case "boolean":
                defaultVals[section.name] = false;
                break;
        }
    });
    return defaultVals;
}

const validateExists = (formData, formErrors, field) => {
    if (!formData[field]?.trim()) {
        formErrors[field] = true;
    }
}

const validateNumber = (formData, formErrors, field, digitsRequired) => {
    if (!formData[field] || formData[field].length !== digitsRequired) {
        formErrors[field] = true;
    }
}

const validateBoolean = (formData, formErrors, field) => {
    if (formData[field] === undefined || formData[field] === null) {
        formErrors[field] = true;
    }
}

const validateName = (formData, formErrors, field) => {
    if (!formData[field].trim() || formData[field].trim().split(/\s+/).length < 2) {
        formErrors[field] = true;
    }
}

const validateEmail = (formData, formErrors, field) => {
    if (!formData[field].trim() || !isEmail(formData[field].trim())) {
        formErrors[field] = true;
    }
}