import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SystemComponent } from '../atoms/SystemComponents';

/**
 * Credits: Starter code provided by https://codepen.io/nzbin/pen/GGrXbp and https://www.youtube.com/watch?v=zY5jOP5v-FY
 * I later applied my own customizations
 */

const Container = styled(SystemComponent)`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #ffffff;
    z-index: 100;
`;

const InnerBox = styled(SystemComponent)`
    margin: 0;
    position: absolute;
    top: 50%;
    right: 50%;
`;

const Pulsate = keyframes`
    0% {
        box-shadow: 9999px 0 0 -5px #9880ff;
    }
    30% {
        box-shadow: 9999px 0 0 2px #9880ff;
    }
    60%,
    100% {
        box-shadow: 9999px 0 0 -5px #9880ff;
    }
`;

const PulsateBefore = keyframes`
    0% {
        box-shadow: 9984px 0 0 -5px #9880ff;
    }
    30% {
        box-shadow: 9984px 0 0 2px #9880ff;
    }
    60%,
    100% {
        box-shadow: 9984px 0 0 -5px #9880ff;
    }
`;

const PulsateAfter = keyframes`
    0% {
        box-shadow: 10014px 0 0 -5px #9880ff;
    }
    30% {
        box-shadow: 10014px 0 0 2px #9880ff;
    }
    60%,
    100% {
        box-shadow: 10014px 0 0 -5px #9880ff;
    }
`;

const DotPulseAnimation = styled(SystemComponent)`
    position: relative;
    left: -9999px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    box-shadow: 9999px 0 0 -5px #9880ff;
    animation: ${Pulsate} 1.5s infinite linear;
    animation-delay: 0.25s;

    &::before,
    &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #9880ff;
        color: #9880ff;
    }

    &::before {
        box-shadow: 9984px 0 0 -5px #9880ff;
        animation: ${PulsateBefore} 1.5s infinite linear;
        animation-delay: 0s;
    }

    &::after {
        box-shadow: 10014px 0 0 -5px #9880ff;
        animation: ${PulsateAfter} 1.5s infinite linear;
        animation-delay: 0.5s;
    }
`;

const LoadingScreen = () => {
    return (
        <Container>
            <InnerBox>
                <SystemComponent display='flex' justifyContent='center'>
                    <DotPulseAnimation />
                </SystemComponent>
            </InnerBox>
        </Container>
    );
};
export default LoadingScreen;
