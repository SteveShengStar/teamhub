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

const externalLinks = {
    0: "steven.xiong.me",
    1: "www.linkedin.ca",
    2: "www.github.com",
    3: "www.facebook.com",
}
const externalLinkLabels = ['Personal Website', 'LinkedIN', 'GitHub', 'Facebook'];


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

const SettingsDiv = ({children, title, onEditClicked}) => {
    return (
        <>
            <EditableSectionHeader title={title} onEditClicked={() => onEditClicked()}/>
            <SettingsDivBody>
                {children}
            </SettingsDivBody>
        </>
    );
}

const SideNavContainer = styled(SystemComponent)`
    box-sizing: border-box;
    display: none;

    width: 360px;
    padding-right: 25px;

    ${theme.mediaQueries.tablet} {
        display: block;
    }
`;

const SideNavMenu = styled(Card)`
    box-sizing: border-box;
    width: "100%";
`;

const ACTIVE_MODAL = {
    TEAMS_RESPONSIBILITIES: 0,
    PROFILE_INFO: 1,
    EXTERNAL_LINKS: 2,
    RESUME: 3,
    NONE: 4
}
if (Object.freeze) { Object.freeze(ACTIVE_MODAL); }

const Home = () => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ activeModal, setActiveModal ] = useState(false);

    return (
        <PageTemplate>
            <>
                <EditSettingsModal visible={modalVisible} 
                    activeModal={activeModal}
                    onCloseModal={() => {
                        setModalVisible(false);
                        setActiveModal(ACTIVE_MODAL.NONE);
                    }}
                />
                <SystemComponent display="flex" overflow="hidden">
                    <SideNavContainer>
                        <SideNavMenu></SideNavMenu>
                    </SideNavContainer>
                    <Card overflow="auto" width={['90vw', '85vw', '100%']} flexGrow={1}>
                        <SettingsDiv title="Teams &amp; Responsibilities" 
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.TEAMS_RESPONSIBILITIES); 
                                setModalVisible(true);
                            }
                        }>
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


                        <SettingsDiv title="Profile Information"
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.PROFILE_INFO); 
                                setModalVisible(true);
                            }}
                        >
                            <ProfileSummary />
                            <SettingsDivSubsection headerText='My Skills'
                                isLabelListSection={true}
                                labelValues={["Circuit Design", "Web Design", "Public Speaking"]}
                                labelStyleVariants={['cancel', 'cancel', 'cancel']}
                            />
                            <SettingsDivSubsection headerText='My Interests'
                                isLabelListSection={true}
                                labelValues={["Self-Driving Cars", "UX Design"]}
                                labelStyleVariants={['cancel', 'cancel']}
                            />
                            <SettingsDivSubsection headerText='Short Bio'
                                isLabelListSection={false}
                            />
                        </SettingsDiv>

                        <SettingsDiv title="Profile Information"
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.EXTERNAL_LINKS); 
                                setModalVisible(true);
                            }}
                        >
                            <SystemComponent display="grid"
                                gridTemplateColumns="150px min(500px, auto)"
                                gridAutoRows="minmax(30px, auto)"
                            >
                                {Object.values(externalLinks).map((url, i) =>
                                    <> 
                                        <SystemComponent fontWeight={theme.fontWeights[1]} 
                                            gridColumn="1 / 2" 
                                            gridRow={(i+1).toString().concat(" / span 1")}
                                        >
                                            {externalLinkLabels[i]}
                                        </SystemComponent>
                                        <SystemComponent gridColumn="2 / 3" 
                                            gridRow={(i+1).toString().concat(" / span 1")}
                                            textAlign="right"
                                        >
                                            {url}
                                        </SystemComponent>
                                    </>
                                )}
                            </SystemComponent>
                        </SettingsDiv>
                    </Card>
                </SystemComponent>
            </>
        </PageTemplate>
    )
};
export default Home;