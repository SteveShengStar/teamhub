import { FORM_SECTION_TYPES } from './constants';

/**
 * Get the form section object associated with the provided section type
 *
 * @param {String} sectionType          From section type  (ie. text, email, longtext)
 */
export function getMenuOptionForSectionType(sectionType) {
    let menuOption;
    switch (sectionType) {
        case 'text':
        case 'numbers':
            menuOption = 'text';
            break;
        case 'longtext':
            menuOption = 'longtext';
            break;
        case 'email':
            menuOption = 'email';
            break;
        case 'phone':
            menuOption = 'phone';
            break;
        case 'checkbox':
        case 'radio':
            menuOption = 'radio';
            break;
        case 'boolean':
            menuOption = 'boolean';
            break;
        case 'menu_single':
        case 'menu_multi':
            menuOption = 'menu_single';
            break;
        default:
            menuOption = '';
    }
    return FORM_SECTION_TYPES.find((t) => t.value === menuOption);
}
