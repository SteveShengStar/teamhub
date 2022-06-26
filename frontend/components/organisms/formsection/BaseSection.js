import React, {useState, useContext} from 'react';
import styled, { ThemeContext } from 'styled-components';

import { SystemComponent, SystemSpan } from '../../atoms/SystemComponents';
import TextField from '@mui/material/TextField';

import Checkbox from '../../atoms/Checkbox';
import Button from '../../atoms/Button';
import Select from '../../atoms/Select';
import Card from '../../atoms/Card';

const ActionButton = styled(Button)`
    background-color: ${props => props.theme.colors.theme};
    color: #000;
    font-weight: ${props => props.theme.fontWeights.bold};
    font-size: ${props => props.theme.fontSizes.header4}px;

    height: 40px;
    width: 120px;
`;

const ActionButtonContainer = styled(SystemComponent)`
    grid-column: 1/3;
    gridRow: 5;
    display: flex;
    flex-direction: row-reverse;

    ${ActionButton} {
        margin-left: 15px;
    }

    ${ActionButton}:last-of-type {
        margin-left: 0;
    }
`;

const ModifierOptions = ({options, handleClick}) => {
    const theme = useContext(ThemeContext);
    return (
        <SystemComponent display="grid" gridRowGap={`${theme.space[4]}px`}>
            {options.map(
                option => 
                <SystemComponent key={option.name} display='flex' height="25px">
                    <SystemComponent mr={`${theme.space[7]}px`}>
                        <Checkbox checked={option.selected} handleClick={(option) => handleClick(option, !option.selected)} value={option} />
                    </SystemComponent>
                    <SystemComponent lineHeight="25px">
                        <SystemSpan display="inline-block" verticalAlign="middle" lineHeight="normal">
                            {option.label}
                        </SystemSpan>
                    </SystemComponent>
                </SystemComponent>
            )}
        </SystemComponent>
    )
};

const BaseSection = ({children, name, question, helpText, sectionModifiers, handleTypeChange, handleSelectModifier}) => {
    const theme = useContext(ThemeContext);
    return (
        <Card 
            display="grid"
            gridTemplateColumns="7fr 3fr"
            gridColumnGap={theme.space[5]}
            gridRowGap={theme.space[5]}
            width={["500px", "700px", "800px"]}
            marginRight="auto"
            marginLeft="auto"
        >
            <TextField
                label="Question"
                defaultValue={question}
                variant="filled"
                size="normal"
            />
            <Select
                options={[
                    {label: "Short Answer", value: "text"}, 
                    {label: "Paragraph", value: "longtext"},
                    {label: "Email", value: "email"},
                    {label: "Multiple Choice", value: "radio"},
                    {label: "Dropdown Menu", value: "menu_single"},
                    {label: "Phone Number", value: "phone"},
                ]}
                styles={{
                    control: base => ({
                        ...base,
                        height: "100%",
                    })
                }}
                onChange={(selectedOption) => handleTypeChange(selectedOption)}
            />
            <TextField
                label="Help Text for User (Optional)"
                defaultValue={helpText}
                variant="filled"
                size="small"
                sx={{
                    gridColumn: '1/3',
                    gridRow: '2',
                }}
            />
            <SystemComponent gridColumn="1" gridRow="3" display="grid" gridTemplateColumns="auto 30px" gridColumnGap={`${theme.space[3]}px`}>
                {children}
            </SystemComponent> 
            <SystemComponent 
                gridColumn="1"
                gridRow='4'
            >
                {
                    sectionModifiers && 
                    <ModifierOptions
                        options={sectionModifiers}
                        handleClick={handleSelectModifier}
                    />
                }
            </SystemComponent>
            <ActionButtonContainer>
                <ActionButton>Delete</ActionButton>
                <ActionButton>Duplicate</ActionButton>
            </ActionButtonContainer>
        </Card> 
    );
}
export default BaseSection;