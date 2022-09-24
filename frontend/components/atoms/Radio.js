import React, { useState } from 'react';
import styled from 'styled-components';
import { SystemComponent } from './SystemComponents';

const RadioButton = ({ selected }) => {
    return (
        <Wrapper selected={selected}>
            <BigCircle />
            <SmallCircle />
        </Wrapper>
    );
};
export default RadioButton;

// Starter code for Radio button implementation provided by: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
// Personal customizations have been applied
const BigCircle = styled(SystemComponent)`
    position: absolute;
    top: 0;
    left: -9px;
    height: 25px;
    width: 25px;
    border: 1px solid ${(props) => props.theme.colors.greys[3]};
    border-radius: 100%;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const SmallCircle = styled(SystemComponent)`
    position: absolute;
    top: 7px;
    left: -2px;
    width: 13px;
    height: 13px;
    background-color: white;
    border-radius: 100%;
`;

const Wrapper = styled(SystemComponent)`
    display: block;
    position: relative;
    margin-left: 10px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    ${BigCircle} {
        background-color: ${(props) =>
            props.selected
                ? props.theme.colors.primaryBlue
                : props.theme.colors.white};
    }

    &:hover ${BigCircle} {
        background-color: ${(props) =>
            props.selected
                ? props.theme.colors.primaryBlue
                : props.theme.colors.greys[1]};
    }

    &:hover ${SmallCircle} {
        display: ${(props) => (props.selected ? 'block' : 'none')};
    }
`;
