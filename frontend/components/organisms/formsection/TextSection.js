import React, { useState, useContext } from "react";
import styled, { ThemeContext } from 'styled-components';
import { SystemComponent } from '../../atoms/SystemComponents';
import { capitalize } from 'lodash'; 

import BaseSection from "./BaseSection";

const AnswerPlaceholder = ({text, className}) => {
    const theme = useContext(ThemeContext);

    return (
        <SystemComponent 
            borderBottom={`2px dotted ${theme.colors.greys[2]}`} 
            className={className}
        >
            <SystemComponent color={`${theme.colors.greys[3]}`}>{capitalize(text)}</SystemComponent>
        </SystemComponent>
    )
}

const AnswerPlaceholderComponent = styled(AnswerPlaceholder)`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const Container = styled(SystemComponent)`
    grid-row: 3; 
    grid-column: 1/3;
    height: 40px;
    position: relative;
`;

const getPlaceholderText = (type) => {
    switch(type) {
        case 'email':
            return 'email address';
        case 'text':
        case 'numbers':
            return 'short-answer text';
        case 'longtext':
            return 'long-answer text';
        case 'phone':
            return 'phone number';
        default:
            return '';
    }
}

const getModifiersBySectionType = (type) => {
    switch(type) {
        case 'email':
            return [];
        case 'text':
            return [{name: "numbers", label: "Users can only enter numbers.", selected: false}];
        case 'numbers':
            return [{name: "numbers", label: "Users can only enter numbers.", selected: true}];
        case 'longtext':
        default:
            return [];
    }
}

const TextSection = ({type, sectionName, question, helpText, handleTypeChange, handleInputChange, handleSectionDelete, handleSectionDuplicate}) => {
    const [sectionModifiers, setSectionModifiers] = useState(getModifiersBySectionType(type))
    return (
        <BaseSection
            type={type} 
            name={sectionName} 
            question={question} 
            helpText={helpText} 
            handleTypeChange={(newType) => {
                setSectionModifiers(getModifiersBySectionType(newType.value));
                handleTypeChange(sectionName, newType.value);
            }}
            handleInputChange={handleInputChange}
            sectionModifiers={sectionModifiers}
            handleSelectModifier={(modifier, selected) => {
                if (modifier.name === 'numbers') {
                    if (selected && type === 'text') {
                        const newType = 'numbers';
                        handleTypeChange(sectionName, newType);
                    } else if (!selected && type === 'numbers') {
                        const newType = 'text';
                        handleTypeChange(sectionName, newType);
                    }
                }

                const idx = sectionModifiers.findIndex(m => m.name === modifier.name);
                if (idx === -1) {
                    throw new Error("TextSection.js: Could not find the appropriate section modifier.");
                }
                const copyOfSectionModifiers = [...sectionModifiers];
                copyOfSectionModifiers[idx] = {
                    ...copyOfSectionModifiers[idx],
                    selected: selected
                }
                setSectionModifiers(copyOfSectionModifiers);
            }}
            handleSectionDelete={handleSectionDelete}
            handleSectionDuplicate={handleSectionDuplicate}
        >
            <Container>
                <AnswerPlaceholderComponent text={getPlaceholderText(type)}/>
            </Container>
        </BaseSection>
    );
}
export default TextSection;
