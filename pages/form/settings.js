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
`;

const ExportRespButton = styled(Button)`
    width: 200px;
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
                <i className={"fa " + faClassName}/>
            </SystemComponent>
            <SystemComponent>
                {title}
            </SystemComponent>
            <SystemComponent textAlign="left"
                marginRight="auto"
                marginLeft="10%"
            >
                {descripBullets.map((i, bullet) =>
                    <li key={i}>{bullet}</li>
                )}
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
                    faClassName='fa-envelope-o'
                    title="Returning Members Form"
                    descripBullets={["Filled in at the end of the term", "Notify team leads about whether the member wants to continue on Waterloop next term"]}
                />
                <FormMetadataSection 
                    faClassName='fa-envelope-o'
                    title="Beginning of Term Form"
                    descripBullets={["Filled in at the beginning of the term", "Notify team leads about a member's plans for this term"]}
                />
                <FormMetadataSection
                    faClassName='fa-envelope-o' 
                    title="New Member Form"
                    descripBullets={["Filled in only once", "Every user will fill out when logging in to TeamHub"]}
                />
            </SystemComponent>
        </PageTemplate>
  );
};

export default Settings;