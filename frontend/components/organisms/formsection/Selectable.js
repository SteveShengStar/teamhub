import React, {useState, useContext} from 'react';
import { ThemeContext } from 'styled-components';
import BaseSection from './BaseSection';

import { SystemComponent } from '../../atoms/SystemComponents';
import TextField from '@mui/material/TextField';

const getModifiersBySectionType = (type) => {
    switch(type) {
        case "checkbox": 
        case "radio": 
        case "menu_single":
        case "menu_multi":
            return [{name: "multi", label: "Users can select multiple values", selected: false}]
        case "boolean": 
        default:
            return [];
    }
}

const Selectable = ({type, sectionName, question, helpText, handleTypeChange}) => {
    const theme = useContext(ThemeContext);
    const [sectionModifiers, setSectionModifiers] = useState(getModifiersBySectionType(type))
    return (
        <BaseSection 
            name={sectionName}
            question={question} 
            helpText={helpText}
            sectionModifiers={sectionModifiers}
            handleTypeChange={(newType) => {
                setSectionModifiers(getModifiersBySectionType(newType.value));
                handleTypeChange(sectionName, newType.value);
            }}
            handleSelectModifier={(modifier, selected) => {
                if (modifier.name === 'multi') {
                    if (selected && type === 'radio') {
                        const newType = 'checkbox';
                        handleTypeChange(sectionName, newType);
                    } else if (selected && type === 'menu_single') {
                        const newType = 'menu_multi';
                        handleTypeChange(sectionName, newType);
                    } else if (!selected && type === 'checkbox') {
                        const newType = 'radio';
                        handleTypeChange(sectionName, newType);
                    } else if (!selected && type === 'menu_multi') {
                        const newType = 'menu_single';
                        handleTypeChange(sectionName, newType);
                    }
                }

                const idx = sectionModifiers.findIndex(m => m.name === modifier.name);
                if (idx === -1) {
                    throw new Error("Selectable.js: Could not find the appropriate section modifier.");
                }
                const copyOfSectionModifiers = [...sectionModifiers];
                copyOfSectionModifiers[idx] = {
                    ...copyOfSectionModifiers[idx],
                    selected: selected,
                }
                setSectionModifiers(copyOfSectionModifiers);
            }}
        >
            <SystemComponent fontSize={`${theme.fontSizes.body2}px`} gridColumn="1/3">Please Edit Your Options Below:</SystemComponent>
            <TextField variant="standard" label="Option 1" 
                size="small"
                sx={{
                    width: "100%",
                    gridColumn: '1',
                    gridRow: '2'
                }}
            />
            <SystemComponent gridColumn='2' gridRow='2' display='flex' alignItems='end' pb={`${theme.space[2]}px`}>
                <span className="fas fa fa-times"/>
            </SystemComponent>
        </BaseSection>
    );
}
export default Selectable;