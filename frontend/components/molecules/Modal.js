import React from 'react';
import styled from 'styled-components';
import { SystemComponent } from '../atoms/SystemComponents';

const Modal = ({ children, className, visible }) => {
    return (
        <Background visible={visible}>
            <ContentContainer
                className={className}
                padding={[
                    'cardPaddingSmall',
                    'cardPaddingSmall',
                    'cardPadding',
                ]}
                visible={visible}
            >
                {React.Children.only(children)}
            </ContentContainer>
        </Background>
    );
};

export default Modal;

const Background = styled.div`
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    justify-items: center;
    align-items: center;
    align-content: center;
    padding: 20vw 0 0 7.5vw;
    overflow: scroll;
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

const ContentContainer = styled(SystemComponent)`
    width: 80vw;
    margin: 0 0 20px 0;
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
