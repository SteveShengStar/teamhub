import React from 'react';
import Selectable from './Selectable';
import TextSection from './TextSection';

const Section = ({type, name, question, helpText, options, canDelete, handleTypeChange, handleInputChange, handleOptionChange, handleOptionAdd, handleOptionDelete, handleSectionDelete, handleSectionDuplicate}) => {
    switch(type) {
        case "text":
        case "email":
        case "longtext":
        case "numbers":
        case "phone":
            return <TextSection sectionName={name} type={type} question={question} helpText={helpText} handleTypeChange={handleTypeChange} handleInputChange={handleInputChange}
                     handleSectionDelete={handleSectionDelete} handleSectionDuplicate={handleSectionDuplicate} canDelete={canDelete} />
        case "checkbox": 
        case "radio": 
        case "boolean": 
        case "menu_single":
        case "menu_multi":
            return <Selectable sectionName={name} type={type} question={question} helpText={helpText} options={options}
                        handleTypeChange={handleTypeChange} handleInputChange={handleInputChange} 
                        handleOptionChange={handleOptionChange} handleOptionAdd={handleOptionAdd} handleOptionDelete={handleOptionDelete} 
                        handleSectionDelete={handleSectionDelete} handleSectionDuplicate={handleSectionDuplicate} canDelete={canDelete}
                    />
        default:
            return <></>;
    }
}
export default Section;