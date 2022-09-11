import { isEmail } from 'validator';

export const onInputChange = (formValues, setFormValues, name, value) => {
    if (name === 'phoneNumber') { // Prevent users from entering non-numeric characters
      if (value && isInvalidPhoneNumber(value)) {
        return;
      }
    } else if (name === 'studentId') { // Prevent users from entering non-numeric characters
      if (value && isInvalidStudentId(value)) {
        return;
      }
    }
    setFormValues({ ...formValues, [name]: value });
};


// form validation utility methods
export const validateField = (formData, formErrors, field) => {
    switch(field) {
        case 'fullName':
            validateName(formData, formErrors, field);
            break;
        case 'email':
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
        case 'subteam':
        case 'nextTermRole':
        case 'nextTermActivity':
        case 'program':
        case 'termStatus':
        case 'memberType':
        case 'nextSchoolTerm':
        case 'nextTermRole':
        case 'nextTermActivity':
            validateNotEmpty(formData, formErrors, field);
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

const validateNotEmpty = (formData, formErrors, field) => {
    if (!formData[field]?.trim()) {
        formErrors[field] = true;
    }
}

const validateNumber = (formData, formErrors, field, digitsRequired) => {
    if (!formData[field] || 
        typeof formData[field] !== 'string' || 
        !formData[field].match(/^[0-9]*$/) || 
        formData[field].length !== digitsRequired
    ) {
        formErrors[field] = true;
    }
}

const validateBoolean = (formData, formErrors, field) => {
    if (typeof formData[field] !== 'boolean') {
        formErrors[field] = true;
    }
}

const validateName = (formData, formErrors, field) => {
    if (typeof formData[field] !== 'string' || 
        !formData[field]?.trim() || 
        formData[field].trim().split(/\s+/).length < 2
    ) {
        formErrors[field] = true;
    }
}

const validateEmail = (formData, formErrors, field) => {
    if (typeof formData[field] !== 'string' || 
        !formData[field]?.trim() || 
        !isEmail(formData[field].trim())
    ) {
        formErrors[field] = true;
    }
}