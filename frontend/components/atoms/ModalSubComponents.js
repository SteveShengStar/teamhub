import styled from 'styled-components';
import { SystemComponent } from './SystemComponents';

export const Background = styled.div`
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    display: grid;
    justify-items: center;
    align-items: center;
    align-content: center;

    ${(props) =>
        props.visible
            ? `
            opacity: 1;
            visibility: visible;
        `
            : `
            visibility: hidden;
            opacity: 0;
        `}
`;

export const ContentContainer = styled(SystemComponent)`
    max-height: calc(100vh - 40vw);
    width: 80vw;
    display: block;
    border-radius: ${(props) => props.theme.radii.small}px;
    box-shadow: ${(props) => props.theme.shadows.default}px;
    background-color: white;

    -webkit-transition: transform 0.5s ease-in-out;
    transition: transform 0.5s ease-in-out;

    ${(props) =>
        props.visible
            ? `
            -webkit-transform: translateY(0);
            transform: translateY(0);
        `
            : `
            -webkit-transform: translateY(100vh);
            transform: translateY(100vh);
        `}
`;
