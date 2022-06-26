import React from 'react';
import Selectable from './Selectable';
import TextSection from './TextSection';

const Section = ({type, name, question, helpText, options, handleTypeChange, handleInputChange, handleOptionChange, handleOptionAdd, handleOptionDelete}) => {
    switch(type) {
        case "text":
        case "email":
        case "longtext":
        case "numbers":
        case "phone":
            return <TextSection sectionName={name} type={type} question={question} helpText={helpText} handleTypeChange={handleTypeChange} handleInputChange={handleInputChange}/>
        case "checkbox": 
        case "radio": 
        case "boolean": 
        case "menu_single":
        case "menu_multi":
            return <Selectable sectionName={name} type={type} question={question} helpText={helpText} options={options}
                        handleTypeChange={handleTypeChange} handleInputChange={handleInputChange} 
                        handleOptionChange={handleOptionChange} handleOptionAdd={handleOptionAdd} handleOptionDelete={handleOptionDelete} 
                    />
        default:
            return <></>;
    }
}
export default Section;