import React from "react";
import styled from "styled-components";
import { SystemComponent } from "./SystemComponents";

const SwitchButton = ({textLeft, textRight, onToggle, selected, className}) => {
    return (
        <Container className={className}>
            <Toggle
                onClick={() => onToggle && onToggle(true)}
                selected={selected}
            >
                {textLeft}
            </Toggle>
            <Toggle
                onClick={() => onToggle && onToggle(false)}
                selected={!selected}
            >
                {textRight}
            </Toggle>
        </Container>
    )
}

export default SwitchButton

const Container = styled(SystemComponent)`
    border-radius: ${props => props.theme.radii.small}px;
    background-color: ${props => props.theme.colors.background};
    display: grid;
    height: 32px;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    cursor: pointer;
    box-shadow: ${props => props.theme.shadows.default};
    transition: all 0.2s ease;
    &:hover {
        transform: scale(1.02);
    }
`;

const Toggle = styled(SystemComponent)`
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: ${props => props.selected ? props.theme.colors.background : props.theme.colors.action};
    color: ${props => props.selected ? props.theme.colors.foreground : props.theme.colors.background};
    font-weight: ${props => props.selected ? 700 : 500};
    font-size: ${props => props.selected ? props.theme.fontSizes.body2 : props.theme.fontSizes.body}px;
    transition: all 0.2s ease;
    &:hover {
        opacity: 0.6;
    }
    &:active {
        opacity: 0.4;
    }
`