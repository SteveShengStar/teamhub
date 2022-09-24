import React from 'react';
import styled, { keyframes } from 'styled-components';
import Card from './Card';

const LoadingModal = ({ visible, color }) => {
    return (
        <Container visible={visible}>
            <Spinner>
                <Bounce1 backgroundColor={color} />
                <Bounce2 backgroundColor={color} />
                <Bounce backgroundColor={color} />
            </Spinner>
        </Container>
    );
};
export default LoadingModal;

const Spinner = styled.div`
    margin: 100px auto 0;
    width: 70px;
    text-align: center;
`;

const bounceDelay = keyframes`
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`;

const Bounce = styled.div`
    width: 18px;
    height: 18px;
    background-color: ${(props) =>
        props.backgroundColor || props.theme.colors.action};

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: ${bounceDelay} 1.4s infinite ease-in-out both;
    animation: ${bounceDelay} 1.4s infinite ease-in-out both;
`;

const Bounce1 = styled(Bounce)`
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
`;

const Bounce2 = styled(Bounce)`
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
`;

const Container = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    transition: all 0.5s ease;

    ${(props) =>
        props.visible
            ? `
        opacity: 1;
        visibility: visible;
    `
            : `
        opacity: 0;
        visibility: hidden;
    `}
`;
