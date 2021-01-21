import React from 'react';
import styled, { keyframes } from 'styled-components';

import { SystemComponent } from '../atoms/SystemComponents';
import Header5 from '../atoms/Header5';
import Body from '../atoms/Body';
import BorderlessButton from '../atoms/BorderlessButton';
import Image from '../atoms/Image';

const RowFlexLayout = styled(SystemComponent)`
    display: flex;
    justify-content: space-between;
`;

const MemberGhostPreviewComponent = ({visible}) => {
    return (
        <GridLayout 
            backgroundColor="greys.0" 
            borderRadius="small" 
            height={36} 
        >
            <Image 
                height={36} 
                key={0}
                src={"/static/default-headshot.png"}
                gridRow="1/3"
                borderRadius="18px"
                overflow="visible"
            />

            <RowFlexLayout>
                <AnimatingBlank width={"50%"} height={"90%"} backgroundColor="greys.1" origin="left">&nbsp;</AnimatingBlank>
                <AnimatingBlank width={"15%"} height={"90%"} backgroundColor="greys.1" origin="right"></AnimatingBlank>
            </RowFlexLayout>

            <RowFlexLayout gridRow="2/3" gridColumn="2/3">
                <AnimatingBlank width={"30%"} height={"90%"} backgroundColor="greys.1" origin="left"></AnimatingBlank>
                <AnimatingBlank width={"10%"} height={"90%"} backgroundColor="greys.1" origin="right"></AnimatingBlank>
            </RowFlexLayout>
            <Dot isOnStream={false}/>

        </GridLayout>
    );
};

const opacityAnim = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`;


const AnimatingBlank = styled(Body)`
    animation: ${opacityAnim} 1s linear infinite;
    transform-origin: ${props => props.origin};
`

const GridLayout = styled(SystemComponent)`
    display: grid;
    grid-template-rows: 18px 18px;
    grid-template-columns: auto 1fr 20px;
    grid-column-gap: ${props => props.theme.space[4]}px;
    padding: ${props => props.theme.space[3]}px;
    /*box-shadow: ${props => props.theme.shadows.default};*/
    cursor: pointer;
    transition: ${props => props.theme.transitions.default};
    &:hover {
        transform: scale(1.01);
        background-color: ${props => props.theme.colors.greys[1]};
        /*box-shadow: ${props => props.theme.shadows.default};*/
    }
    &:active {
        /*box-shadow: ${props => props.theme.shadows.dark};*/
        transform: scale(1.025);
    }
`;

const Dot = styled.div`
    align-self: center;
    justify-self: end;
    width: 15px;
    height: 15px;
    border-radius: 8px;
    background-color: #CCCCCC;
    grid-row: 1/3;
    animation: ${opacityAnim} 1s linear infinite;
`

export default MemberGhostPreviewComponent;