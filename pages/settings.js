import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import Card from '../frontend/components/atoms/Card';
import Header3 from '../frontend/components/atoms/Header3';
import LargeButton from '../frontend/components/atoms/LargeButton';
import {SystemComponent} from '../frontend/components/atoms/SystemComponents';
import SettingsDivSubsection from '../frontend/components/molecules/SettingsDivSubsection';
import ProfileSummary from '../frontend/components/molecules/AccountSettings/ProfileSummary';
import EditSettingsModal from '../frontend/components/molecules/EditSettingsModal';
import PageTemplate from '../frontend/components/templates/PageTemplate';

import theme from '../frontend/components/theme';


// Assumption: I receive an ID representing subteam
// I can look up the corresponding subteam color code
const subteams = ['software', 'electrical'];
const projects = ['teamhub', 'test rig programming'];


const EditableSectionHeader = ({title, onEditClicked}) => {
    return (
        <SystemComponent display='flex' justifyContent='flex-start' flexDirection='row'>
            <SystemComponent style={{ transformOrigin: 'left' }} 
                mr={theme.space.editableHeaderMargin}
            >
                <Header3>{title}</Header3>
            </SystemComponent>
            <LargeButton onClickHandler={() => onEditClicked()} variant="cancel">Edit</LargeButton>
        </SystemComponent>
    )
}
// TODO: Discuss naming of button colours, especially for gray. "cancel" may be a bad label


const SettingsDivBody = styled(SystemComponent)`
    padding-left: ${theme.space.settingsSubsectionPadding}px;
`;

// Text Area
// TODO: Delete this component
const NonEditableTextArea = styled(SystemComponent)`
    width: 100%;
`;

const SettingsDiv = ({children, title}) => {
    const [ modalVisible, setModalVisible ] = useState(false);

    return (
        <>
            <EditSettingsModal visible={modalVisible} 
                title={title}
                onCloseModal={() => setModalVisible(false)}
            >
                <SystemComponent>HAHAHAHA</SystemComponent>
            </EditSettingsModal>
            <EditableSectionHeader title={title} onEditClicked={() => setModalVisible(true)}/>
            <SettingsDivBody>
                {children}
            </SettingsDivBody>
        </>
    );
}

const Home = () => {
    return (
        <PageTemplate>
            <Card overflowY="auto">
                <SettingsDiv title="Teams &amp; Responsibilities">
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
                </SettingsDiv>


                <SettingsDiv title="Profile Information">
                    <ProfileSummary />
                </SettingsDiv>
            </Card>
        </PageTemplate>
    )
};
export default Home;