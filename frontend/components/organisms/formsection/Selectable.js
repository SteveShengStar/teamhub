import React, {useState, useContext} from 'react';
import styled, { ThemeContext } from 'styled-components';
import BaseSection from './BaseSection';

import { SystemComponent, SystemSpan } from '../../atoms/SystemComponents';
import TextField from '@mui/material/TextField';
import GhostButton from '../../atoms/GhostButton';

const getModifiersBySectionType = (type) => {
    switch(type) {
        case "checkbox": 
            return [{name: "multi", label: "Users can select multiple values", selected: true}]
        case "radio": 
            return [{name: "multi", label: "Users can select multiple values", selected: false}]
        case "menu_single":
            return [{name: "multi", label: "Users can select multiple values", selected: false}]
        case "menu_multi":
            return [{name: "multi", label: "Users can select multiple values", selected: true}]
        case "boolean": 
        default:
            return [];
    }
}

const RemoveOptionButton = styled(SystemComponent)`
    grid-column: 3;
    display: flex;
    align-items: end;
    padding-bottom: ${props => props.theme.space[2]}px;
    cursor: pointer;
`;

const OptionRow = ({opt, optionIdx, handleOptionChange, handleOptionDelete}) => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <SystemComponent gridColumn='1' display='flex' alignItems='end' pb={`${theme.space[2]}px`}>
                <SystemSpan fontSize={theme.fontSizes.header4}>{optionIdx + 1}.</SystemSpan>
            </SystemComponent>
            <TextField 
                variant="standard" 
                value={opt}
                onChange={(e) => handleOptionChange(optionIdx, e.target.value)}
                size="small"
                sx={{
                    width: "100%",
                    gridColumn: '2',
                }}
            />
            <RemoveOptionButton>
                <span className="fas fa fa-times" onClick={() => handleOptionDelete(optionIdx)}/>
            </RemoveOptionButton>
        </>
    );
}

const AddOptionButton = ({handleOptionAdd}) => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <SystemComponent/>
            <GhostButton variant='neutral' onClick={() => handleOptionAdd()}>Add Option</GhostButton>
        </>
    )
}

const Selectable = ({type, sectionName, question, helpText, options = [], handleTypeChange, handleInputChange, handleOptionChange, handleOptionAdd, handleOptionDelete}) => {
    const theme = useContext(ThemeContext);
    const [sectionModifiers, setSectionModifiers] = useState(getModifiersBySectionType(type))
    return (
        <BaseSection 
            type={type}
            name={sectionName}
            question={question} 
            helpText={helpText}
            sectionModifiers={sectionModifiers}
            handleTypeChange={(newType) => {
                setSectionModifiers(getModifiersBySectionType(newType.value));
                handleTypeChange(sectionName, newType.value);
            }}
            handleInputChange={handleInputChange}
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
            <SystemComponent display="grid" gridTemplateColumns="12px auto 12px" gridColumnGap={`${theme.space[3]}px`} gridRowGap={`${theme.space[3]}px`}>
                <SystemComponent fontSize={`${theme.fontSizes.body2}px`} gridColumn="1/4">Edit Your Options Below:</SystemComponent>
                {
                    options.map((opt, optionIdx) => 
                        <OptionRow key={optionIdx} opt={opt} optionIdx={optionIdx} handleOptionChange={(optionIdx, newValue) => handleOptionChange(sectionName, optionIdx, newValue)} handleOptionDelete={(optionIdx) => handleOptionDelete(sectionName, optionIdx)} />
                    )
                }
                <AddOptionButton handleOptionAdd={() => handleOptionAdd(sectionName)}/>
            </SystemComponent>
        </BaseSection>
    );
}
export default Selectable;