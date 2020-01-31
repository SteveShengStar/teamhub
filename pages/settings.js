import React from 'react';
import styled from 'styled-components';

import PageTemplate from '../frontend/components/templates/PageTemplate';
import Card from '../frontend/components/atoms/Card';

/* Testing Steven Steven's changes */
import Header3 from '../frontend/components/atoms/Header3';
import Header4 from '../frontend/components/atoms/Header4';
import {SystemComponent} from '../frontend/components/atoms/SystemComponents';
import Image from '../frontend/components/atoms/Image';

import Button from '../frontend/components/atoms/Button';
import theme from '../frontend/components/theme';
import {capitalize, startCase} from 'lodash';


const subheadingHeight = 30;
const SettingsDivBody = styled(SystemComponent)`
`;

// Assumption: I receive an ID representing subteam
// I can look up the corresponding subteam color code
const subteams = ['software', 'electrical'];
const projects = ['teamhub', 'test rig programming'];

const CustomSubHeading = styled(Header4)`
    font-size: 16.5px;
`;

 
// TODO: change to props => props.theme later
const EditButton = styled(Button)`
    background-color: ${theme.colors.greys[2]};
    height: 30px;
`;

const CustomButton = styled(Button)`
    padding-top: 2px;
    padding-bottom: 2px;

    // TODO: make this not scale by 1.5
    &:hover: {
        transform: scale(1.0);
    }
`;

const EditableSectionHeader = ({title}) => {
    const buttonLabel = 'Edit';

    return (
        <SystemComponent display='flex' justifyContent='flex-start' flexDirection='row'>
            <SystemComponent style={{ transformOrigin: 'left' }} 
                mr={theme.space.editableHeaderMargin}
            >
                <Header3>{title}</Header3>
            </SystemComponent>
            <EditButton><Header4 color="#ffffff">{buttonLabel}</Header4></EditButton>
        </SystemComponent>
    )
}

const ButtonWrapper = ({variant, label}) => {
    return (
        <CustomButton variant={variant} 
            mr={theme.space[5]}
        >
            {label}
        </CustomButton>
    );
};

const SettingsDivSubsection = ({children, headerText}) => {
    //console.log(theme.colors[subteams[1]]);

    return (
        <SystemComponent pl={theme.space.settingsSubsectionPadding}>
            {headerText &&  
                <SystemComponent height={subheadingHeight}>
                    <CustomSubHeading>{headerText}</CustomSubHeading>
                </SystemComponent>
            }
            <SystemComponent>
                {children}
            </SystemComponent>
        </SystemComponent>
    );
};

// Text Area
// TODO: Delete this component
const NonEditableTextArea = styled(SystemComponent)`
    width: 100%;
`;
// TODO: Set actual image URL later
const imageUrl = undefined;


const Home = () => (
    <PageTemplate >
        <Card>
            <EditableSectionHeader title="Teams &amp; Responsibilities"></EditableSectionHeader>
            <SettingsDivBody>
                <SettingsDivSubsection headerText='My Subteams'>
                    {
                        subteams.map(subteamName => 
                            <ButtonWrapper variant={subteamName} 
                                label={startCase(subteamName)}
                            />
                        )
                    }
                </SettingsDivSubsection>
                <SettingsDivSubsection headerText='My Projects'>
                    {
                        projects.map(project => 
                            <ButtonWrapper variant={'software'} 
                                label={startCase(project)}
                            />
                        )
                    }
                </SettingsDivSubsection>
                <SettingsDivSubsection headerText='What do I do on Teamhub ?'>
                    <NonEditableTextArea>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus 
                        sodales blandit. Nam eget dui ipsum. Fusce elit lorem, aliquet sed ipsum quis, 
                        euismod porta urna. Suspendisse egestas dui at massa ultricies, in consectetur 
                        sapien rutrum. Fusce pulvinar vel felis id pretium. Vestibulum mattis auctor 
                        varius. Suspendisse maximus tortor ac lacinia maximus. Nam sit amet ultrices magna. 
                    </NonEditableTextArea>
                </SettingsDivSubsection>
                
            </SettingsDivBody>

            <EditableSectionHeader title="Profile Information"></EditableSectionHeader>
            <SettingsDivBody display='flex'>
                <SettingsDivSubsection>
                    <SystemComponent width='200px'>
                        <Image  
                            key={0}
                            width='100%'
                            src={imageUrl || "/static/default-headshot.png"}
                            gridRow="1/3"
                            borderRadius="18px"
                            overflow="visible"
                        />
                    </SystemComponent>
                    <SystemComponent overflowY='scroll'>
                        
                    </SystemComponent>
                </SettingsDivSubsection>
            </SettingsDivBody>
        </Card>
    </PageTemplate>
);
export default Home;