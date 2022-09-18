import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { getMenuOptionForSectionType } from './util';
import { FORM_SECTION_TYPES } from './constants';

import { SystemComponent, SystemSpan } from '../../atoms/SystemComponents';
import TextField from '@mui/material/TextField';

import Checkbox from '../../atoms/Checkbox';
import Button from '../../atoms/Form/ActionButton';
import Select from '../../atoms/Select';
import Card from '../../atoms/Card';

const ActionButton = styled(Button)`
    background-color: ${(props) =>
        props.disabled
            ? props.theme.colors.greys[1]
            : props.theme.colors.theme};
    color: ${(props) => props.theme.colors.black};

    ${(props) => props.disabled && 'cursor: not-allowed;'}
`;

const ActionButtonContainer = styled(SystemComponent)`
    grid-column: 1/3;
    gridrow: 5;
    display: flex;
    flex-direction: row-reverse;

    ${ActionButton} {
        margin-left: 15px;
    }

    ${ActionButton}:last-of-type {
        margin-left: 0;
    }
`;

const ModifierOptions = ({
    options,
    handleClick,
    required,
    handleToggleRequired,
}) => {
    const theme = useContext(ThemeContext);
    return (
        <SystemComponent
            paddingTop='15px'
            paddingBottom='15px'
            display='grid'
            gridRowGap={`${theme.space[4]}px`}
        >
            <SystemComponent display='flex' height='25px'>
                <SystemComponent mr={`${theme.space[7]}px`}>
                    <Checkbox
                        checked={required}
                        handleClick={() => handleToggleRequired(!required)}
                    />
                </SystemComponent>
                <SystemComponent lineHeight='25px'>
                    <SystemSpan
                        display='inline-block'
                        verticalAlign='middle'
                        lineHeight='normal'
                        fontSize={theme.fontSizes.header4}
                    >
                        User must fill in this Question
                    </SystemSpan>
                </SystemComponent>
            </SystemComponent>
            {options.map((option) => (
                <SystemComponent key={option.name} display='flex' height='25px'>
                    <SystemComponent mr={`${theme.space[7]}px`}>
                        <Checkbox
                            checked={option.selected}
                            handleClick={(option) =>
                                handleClick(option, !option.selected)
                            }
                            value={option}
                        />
                    </SystemComponent>
                    <SystemComponent lineHeight='25px'>
                        <SystemSpan
                            display='inline-block'
                            verticalAlign='middle'
                            lineHeight='normal'
                            fontSize={theme.fontSizes.header4}
                        >
                            {option.label}
                        </SystemSpan>
                    </SystemComponent>
                </SystemComponent>
            ))}
        </SystemComponent>
    );
};

const BaseSection = ({
    children,
    type,
    name,
    question,
    helpText,
    required,
    canDelete,
    sectionModifiers,
    handleTypeChange,
    handleInputChange,
    handleSelectModifier,
    handleSectionDelete,
    handleSectionDuplicate,
    handleToggleRequired,
}) => {
    const theme = useContext(ThemeContext);
    return (
        <Card
            display='grid'
            gridTemplateColumns='7fr 3fr'
            gridColumnGap={theme.space[5]}
            gridRowGap={theme.space[5]}
            width={['500px', '700px', '800px']}
            marginBottom={`${theme.space[7]}px`}
            marginRight='auto'
            marginLeft='auto'
        >
            <TextField
                label='Question'
                variant='filled'
                size='normal'
                value={question}
                onChange={(e) => {
                    handleInputChange(name, 'display', e.target.value);
                }}
            />
            <Select
                options={FORM_SECTION_TYPES}
                styles={{
                    control: (base) => ({
                        ...base,
                        height: '100%',
                    }),
                }}
                value={getMenuOptionForSectionType(type)}
                onChange={(selectedOption) => handleTypeChange(selectedOption)}
            />
            <TextField
                label='Help Text for User (Optional)'
                variant='filled'
                size='small'
                value={helpText}
                onChange={(e) => {
                    handleInputChange(name, 'description', e.target.value);
                }}
                sx={{
                    gridColumn: '1/3',
                    gridRow: '2',
                }}
            />
            <SystemComponent gridColumn='1'>
                <ModifierOptions
                    options={sectionModifiers}
                    handleClick={handleSelectModifier}
                    required={required}
                    handleToggleRequired={(newRequiredState) =>
                        handleToggleRequired(name, newRequiredState)
                    }
                />
            </SystemComponent>
            <SystemComponent gridColumn='1'>{children}</SystemComponent>
            <ActionButtonContainer>
                <ActionButton
                    disabled={!canDelete}
                    title={!canDelete && `This Section cannot be Deleted`}
                    onClick={() => handleSectionDelete(name)}
                >
                    Delete
                </ActionButton>
                <ActionButton onClick={() => handleSectionDuplicate(name)}>
                    Duplicate
                </ActionButton>
            </ActionButtonContainer>
        </Card>
    );
};
export default BaseSection;
