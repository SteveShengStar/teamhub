import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import styled, { ThemeContext } from 'styled-components';
import PageTemplate from '../../frontend/components/templates/PageTemplate';
import {
  SystemComponent
} from '../../frontend/components/atoms/SystemComponents';
import Card from '../../frontend/components/atoms/Card';
import Button from '../../frontend/components/atoms/Button';

const EditFormButton = styled(Button)`
    width: 200px;
    margin-bottom: ${props => props.theme.space.cardPaddingSmall}px; 
    // ^^^ to fit the figma layout this margin-bottom should actually be 16px instead of 10px i think.
    margin-top: 16px;
    // background: #4C6DFF;
`;

const ExportRespButton = styled(Button)`
    width: 200px;
`

const CheckmarkRow = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 5px;
    margin-left: 4px;
`
const Text = styled.div`
    // font-size: ${props => props.theme.fontSizes.header4}px;
    // line-height: 2;
    // position: absolute;
    // width: 344px;
    // height: 72px;
    // left: 104px;
    // top: 396px;

    font-family: 'SF Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 24px; 

    color: #000000;

`

const BigIconWrapper = styled.div`
    height: 57px;
    width: 57px;
    display: flex;
    align-item: center;
    border-radius: 50%;
    border: 2px solid;
    padding: 2px;
    justify-content: center;
    box-sizing: border-box;
`

const IconWrapper = styled.div`
    // margin-top: 5px;
    // margin-right: 5px;
    margin-right: 16px;
    // margin-left: 4px;
    display: flex;
    align-item: flex-start;
    // border-radius: 50%;
    // border: 1px solid;
    // padding: 2px;
    height: 24px;
    width: 24px;
`

const TitleText = styled.div`
    // font-size: ${props => props.theme.fontSizes.header2}px;
    // font-size: 30px;
    font-family: 'SF Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    text-align: center;
    letter-spacing: -0.01em;
    margin-top: 17px;
    margin-bottom: 40px;

    color: #000000;
`
const SpecialIcon = styled.div`
    font-family: 'Avenir Next Condensed';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormMetadataSection = ({faClassName, title, descripBullets}) => {
    return (
        <Card
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <SystemComponent>
                <BigIconWrapper>
                    {title === "Beginning of Term Form" ? <SpecialIcon>New</SpecialIcon> : <i className={"fa " + faClassName}/>}
                </BigIconWrapper>
            </SystemComponent>
            <SystemComponent>
                <TitleText>{title}</TitleText>
            </SystemComponent>
            <SystemComponent textAlign="left"
                marginRight="auto"
                marginLeft="10%"
            >
                {descripBullets.map((bullet, i) =>{
                    console.log(bullet);
                    return (
                    <CheckmarkRow>
                        <IconWrapper>
                            <i className = "fa fa-check-circle fa-2x"/>
                        </IconWrapper>
                        
                        <Text>{bullet}</Text>
                    </CheckmarkRow>
                    )
                        
                    // <li key={i}>{bullet}</li>
                })}
            </SystemComponent>
            <EditFormButton>Edit Form</EditFormButton>
            <ExportRespButton variant="white">Export Responses</ExportRespButton>
        </Card>
    )
}

const Settings = () => {
    return (
        <PageTemplate title="Form Settings">
            <SystemComponent
                display="grid"
                gridTemplateColumns={["1fr", "repeat(2, 1fr);", "repeat(2, 1fr);", "repeat(3, 1fr);"]}
                gridAutoRows={"minmax(500px, 500px)"}
                gridColumnGap={5}
                gridRowGap={6}
            >
                <FormMetadataSection
                    faClassName='fa-light fa-user-plus fa-3x'
                    title="Returning Members Form"
                    descripBullets={["Filled in at the end of the term", "Notify team leads about whether the member wants to continue on Waterloop next term"]}
                />
                <FormMetadataSection 
                    faClassName='fa-envelope-o'
                    title="Beginning of Term Form"
                    descripBullets={["Filled in at the beginning of the term", "Notify team leads about a member's plans for this term"]}

                />
                <FormMetadataSection
                    faClassName='fa-light fa-user-plus fa-3x' 
                    title="New Member Form"
                    descripBullets={["Filled in only once", "Every user will fill out when logging in to TeamHub"]}
                />
            </SystemComponent>
        </PageTemplate>
  );
};

export default Settings;