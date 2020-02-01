import React from 'react';
import styled from 'styled-components';

import Card from '../frontend/components/atoms/Card';
import Header3 from '../frontend/components/atoms/Header3';
import Header4 from '../frontend/components/atoms/Header4';
import EditButton from '../frontend/components/atoms/AccountSettings/EditButton';
import {SystemComponent} from '../frontend/components/atoms/SystemComponents';
import SettingsDivSubsection from '../frontend/components/molecules/SettingsDivSubsection';
import ProfileSummary from '../frontend/components/molecules/AccountSettings/ProfileSummary';
import PageTemplate from '../frontend/components/templates/PageTemplate';

import theme from '../frontend/components/theme';


// Assumption: I receive an ID representing subteam
// I can look up the corresponding subteam color code
const subteams = ['software', 'electrical'];
const projects = ['teamhub', 'test rig programming'];


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


const SettingsDivBody = styled(SystemComponent)`
    padding-left: ${theme.space.settingsSubsectionPadding}px;
`;
// Text Area
// TODO: Delete this component
const NonEditableTextArea = styled(SystemComponent)`
    width: 100%;
`;

const Home = () => {
    return (
        <PageTemplate >
            <Card overflowY="auto">
                <EditableSectionHeader title="Teams &amp; Responsibilities"></EditableSectionHeader>
                <SettingsDivBody>
                    <SettingsDivSubsection headerText='My Subteams'
                        isLabelListSection={true}
                        labelValues={subteams}
                        labelStyleVariants={subteams}
                    />
                    <SettingsDivSubsection headerText='My Projects'
                        isLabelListSection={true}
                        labelValues={projects}
                        labelStyleVariants={['software', 'software']}
                    />
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
                <SettingsDivBody>
                    <ProfileSummary />
                </SettingsDivBody>
            </Card>
        </PageTemplate>
    )
};
export default Home;