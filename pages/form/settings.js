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
    width: 100%;
    height: 48px;
    margin-bottom: ${props => props.theme.space.headerBottomMargin}px; 
    // ^^^ to fit the figma layout this margin-bottom should actually be 16px instead of 10px i think.
    margin-top: 16px;
    border-radius: 5px;
`;

const ExportRespButton = styled(Button)`
    width: 100%;
    height: 48px;
    border-radius: 5px;
`

const CheckmarkRow = styled.div`
    display: flex;
    align-items: flex-start;
`

const Text = styled.div`
    font-family: 'SF Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

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
const Svg = styled.img`
    justify-content: center;
    height: 30px;
    width: 30px;
    margin-top: 10px;
`

const TitleText = styled.div`
    font-family: 'SF Pro';
    font-style: normal;
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes.header2}px;
    line-height: 29px;
    /* identical to box height */

    text-align: center;
    letter-spacing: -0.01em;
    margin-top: 17px;
    margin-bottom: 40px;

    color: #000000;
`

const FormInfoCard = styled(Card)`
    padding: 30px;
    ${props => props.theme.mediaQueries.mobile} {
        padding: 20px;
    }
    @media screen and (min-width: 1400px) {
        padding: 30px;
    }
`

const Bullet = ({text, className}) => {
    return (
        <CheckmarkRow className={className}>
            <i className="fa fa-check-circle fa-2x" style={{marginRight: "15px"}}/>
            <Text>{text}</Text>
        </CheckmarkRow>
    );
}

const BulletOverride = styled(Bullet)`
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
`;

const BulletsSection = styled(SystemComponent)`
    text-align: left;
    margin-right: auto;
    margin-left: auto;
    height: 200px;
`;

const FormMetadataSection = ({src, title, bulletPoints}) => {
    return (
        <FormInfoCard
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            maxWidth="450px"
            marginLeft="auto"
            marginRight="auto"
        >
            <SystemComponent>
                <BigIconWrapper>
                    <Svg src={src}></Svg>
                </BigIconWrapper>
            </SystemComponent>
            <SystemComponent>
                <TitleText>{title}</TitleText>
            </SystemComponent>
            <BulletsSection>
                {bulletPoints.map((bullet, i) => 
                    <BulletOverride margin="10px" key={i} text={bullet}/>
                )}
            </BulletsSection>
            <EditFormButton>Edit Form</EditFormButton>
            <ExportRespButton variant="white">Export Responses</ExportRespButton>
        </FormInfoCard>
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
                    src = "/static/returning-members-icon.jpg"
                    title="Returning Members Form"
                    bulletPoints={["Filled in at the end of the term", "Notify team leads about whether the member wants to continue on Waterloop next term"]}
                />
                <FormMetadataSection 
                    src = "/static/beginning-of-term-icon.jpg"
                    title="Beginning of Term Form"
                    bulletPoints={["Filled in at the beginning of the term", "Notify team leads about a member's plans for this term"]}
                />
                <FormMetadataSection
                    src = "/static/sign-up-icon.svg"
                    title="Sign-Up Form"
                    bulletPoints={["Filled in only once", "Every user will fill out when logging in to TeamHub"]}
                />
            </SystemComponent>
        </PageTemplate>
  );
};

export default Settings;