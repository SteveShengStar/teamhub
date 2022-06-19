import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from 'styled-components';

import TextField from '@mui/material/TextField';
import {useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PageTemplate from "../../../frontend/components/templates/PageTemplate";
import { SystemComponent, SystemSpan } from "../../../frontend/components/atoms/SystemComponents";

import { useFormDetails } from '../../../frontend/store/api/forms';
import Button from "../../../frontend/components/atoms/Button";
import Select from "../../../frontend/components/atoms/Select";
import Card from "../../../frontend/components/atoms/Card";
import Checkbox from "../../../frontend/components/atoms/Checkbox";

const ModiferOptions = ({options}) => {
    const theme = useContext(ThemeContext);

    return (
        <SystemComponent display="grid" gridRowGap={`${theme.space[4]}px`}>
            {options.map(
                option => 
                <SystemComponent display='flex' height="25px">
                    <SystemComponent mr={`${theme.space[7]}px`}>
                        <Checkbox />
                    </SystemComponent>
                    <SystemComponent lineHeight="25px"><SystemSpan display="inline-block" verticalAlign="middle" lineHeight="normal">{option}</SystemSpan></SystemComponent>
                </SystemComponent>
            )}
        </SystemComponent>
    )
};

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

const TextAnswerPlaceholder = ({text, className}) => {
    const theme = useContext(ThemeContext);

    return (
        <SystemComponent 
            borderBottom={`2px dotted ${theme.colors.greys[2]}`} 
            className={className}
        >
            <SystemComponent color={`${theme.colors.greys[3]}`}>{text}</SystemComponent>
        </SystemComponent>
    )
}

const TextAnswerPlaceholderComponent = styled(TextAnswerPlaceholder)`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const TextAnswerPlaceholderContainer = styled(SystemComponent)`
    grid-row: 3; 
    grid-column: 1/3;
    height: 40px;
    position: relative;
`;

const RegFormEditor = () => {
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        useFormDetails('629c13c59d0c0a6b357b4e0f', dispatch, router)
            .then(res => {
                console.log("res.body");
                console.log(res.body);
            })
            .catch(e => console.error(e));
    })

    return (
        <PageTemplate>
            <SystemComponent>
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
                        defaultValue="Question"
                        variant="filled"
                        size="normal"
                    />
                    <Select
                        options={[
                            {label: "Short Answer", value: "text"}, 
                            {label: "Long Answer", value: "longtext"},
                            {label: "Phone Number", value: "phone"},
                            {label: "Multiple Choice", value: "radio"},
                            {label: "Checkboxes", value: "checkbox"},
                            {label: "Dropdown Menu", value: "menu"}
                        ]}
                        // "text", "numbers", "phone", "checkbox", "radio", "boolean", "longtext", "menu_single", "menu_multi"
                        styles={{
                            control: base => ({
                              ...base,
                              height: "100%",
                            })
                        }}
                    />
                    <TextField
                        label="Help Text for User (Optional)"
                        defaultValue="Help Text for User (Optional)"
                        variant="filled"
                        size="small"
                        sx={{
                            gridColumn: '1/3',
                            gridRow: '2',
                        }}
                    />
                    <TextAnswerPlaceholderContainer>

                    </TextAnswerPlaceholderContainer>
                    <SystemComponent
                        gridRow="3" 
                        gridColumn="1/3"
                        height="40px"
                        position="relative"
                    >
                        <TextAnswerPlaceholderComponent text='Short Answer'/>
                    </SystemComponent> 
                    <SystemComponent 
                        gridColumn="1"
                        gridRow='4'
                    >
                        <ModiferOptions
                            options={["Only allow users to enter numbers for this response"]}
                        />
                    </SystemComponent>
                    <ActionButtonContainer>
                        <ActionButton>Delete</ActionButton>
                        <ActionButton>Duplicate</ActionButton>
                    </ActionButtonContainer>
                </Card>
            </SystemComponent>
        </PageTemplate>
    );
}
export default RegFormEditor
