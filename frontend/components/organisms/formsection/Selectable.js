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

const OptionRow = ({opt, optionIdx, handleOptionChange, handleOptionDelete, readOnly}) => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <SystemComponent gridColumn='1' display='flex' alignItems='end' pb={`${theme.space[2]}px`}>
                <SystemSpan color={readOnly && `${theme.colors.greys[3]}`} fontSize={theme.fontSizes.header4}>{optionIdx + 1}.</SystemSpan>
            </SystemComponent>
            <TextField 
                variant="standard" 
                value={opt}
                disabled={readOnly}
                onChange={(e) => handleOptionChange(optionIdx, e.target.value)}
                size="small"
                sx={{
                    width: "100%",
                    gridColumn: '2',
                }}
            />
            {
                !readOnly &&
                <RemoveOptionButton>
                    <span className="fas fa fa-times" onClick={() => handleOptionDelete(optionIdx)}/>
                </RemoveOptionButton>
            }
        </>
    );
}

const AddOptionButton = ({handleOptionAdd}) => {
    return (
        <>
            <SystemComponent/>
            <GhostButton variant='neutral' onClick={() => handleOptionAdd()}>Add Option</GhostButton>
        </>
    )
}

const OptionsList = ({options, type, handleOptionChange, handleOptionAdd, handleOptionDelete}) => {
    const theme = useContext(ThemeContext);
    if (type === 'boolean') {
        return (
            <>
                <OptionRow opt='Yes' optionIdx={0} readOnly='true' />
                <OptionRow opt='No' optionIdx={1} readOnly='true' />
            </>
        );
    } else {
        return (
            <>
                <SystemComponent fontSize={`${theme.fontSizes.body2}px`} gridColumn="1/4">Edit Your Options Below:</SystemComponent>
                {
                    options.map((opt, optionIdx) => 
                        <OptionRow key={optionIdx} opt={opt} optionIdx={optionIdx} handleOptionChange={(optionIdx, newValue) => handleOptionChange(sectionName, optionIdx, newValue)} handleOptionDelete={(optionIdx) => handleOptionDelete(sectionName, optionIdx)} />
                    )
                }
                <AddOptionButton handleOptionAdd={() => handleOptionAdd(sectionName)}/>
            </>
        )
    }
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
                <OptionsList
                    options={options}
                    type={type}
                    handleOptionAdd={handleOptionAdd}
                    handleOptionChange={handleOptionChange}
                    handleOptionDelete={handleOptionDelete}
                />
            </SystemComponent>
        </BaseSection>
    );
}
export default Selectable;