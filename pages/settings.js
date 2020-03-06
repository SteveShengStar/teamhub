import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import {ACTIVE_MODAL} from '../frontend/components/constants';
import Card from '../frontend/components/atoms/Card';
import Header3 from '../frontend/components/atoms/Header3';
import Header5 from '../frontend/components/atoms/Header5';
import LargeButton from '../frontend/components/atoms/LargeButton';
import {SystemComponent, SystemLink} from '../frontend/components/atoms/SystemComponents';
import SettingsDivSubsection from '../frontend/components/molecules/SettingsDivSubsection';
import ProfileSummary from '../frontend/components/molecules/AccountSettings/ProfileSummary';
import SettingsModalSelector from '../frontend/components/atoms/SettingsModalSelector';

import member from '../frontend/mockdata/member';
import {lowerCase} from 'lodash';


import PageTemplate from '../frontend/components/templates/PageTemplate';
import theme from '../frontend/components/theme';

const altText = [
    "Website link",
    "Linkedin Profile link",
    "Github Profile link",
    "Facebook Profile link"
]

const skills = member.skills;
const subteams = member.subteams;
const interests = member.interests;
const projects = member.projects;
const bio = member.bio;

const externalLinks = [member.facebook, member.github, member.linkedin, member.website];
const externalLinkLabels = ["Facebook",
                            "Github",
                            "LinkedIn",
                            "Personal Website"];
    

const EditableSectionHeader = ({title, handleEditClicked}) => {
    return (
        <SystemComponent display='flex' justifyContent='flex-start' flexDirection='row'>
            <SystemComponent style={{ transformOrigin: 'left' }} 
                mr={theme.space.editableHeaderMargin}
            >
                <Header3>{title}</Header3>
            </SystemComponent>
            <LargeButton handleClick={handleEditClicked} variant="primary">Edit</LargeButton>
        </SystemComponent>
    )
}
// TODO: Discuss naming of button colours, especially for gray. "cancel" may be a bad label


const SettingsDivBody = styled(SystemComponent)`
    padding-left: ${theme.space.settingsSubsectionPadding}px;
    display: grid;
    grid-row-gap: ${theme.space[3]}px;
    margin-bottom: ${theme.space[5]}px;
`;

// Text Area
// TODO: Delete this component
const NonEditableTextArea = styled(SystemComponent)`
    width: 100%;
`;

const SettingsDiv = ({children, title, onEditClicked}) => {
    return (
        <>
            <EditableSectionHeader title={title} handleEditClicked={onEditClicked}/>
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

const ThreeColumnGrid = styled(SystemComponent)`
    display: grid;
    grid-template-columns: 150px auto;
    grid-auto-rows: minmax(30px, auto);

    ${theme.mediaQueries.mobile} {
        grid-template-columns: 150px 350px;
    }
    ${theme.mediaQueries.tablet} {
        grid-template-columns: 150px auto;
    }
    @media screen and (min-width: 935px) {
        grid-template-columns: 150px 300px;
    }
`;

const NonUnderlinedLink = styled(SystemLink)`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Home = () => {
    const [ activeModal, setActiveModal ] = useState(false);

    const handleCloseModal = () => {
        setActiveModal(ACTIVE_MODAL.NONE);
    }

    return (
        <PageTemplate>
            <>
                <SettingsModalSelector  
                    activeModal={activeModal}
                    handleCloseModal={handleCloseModal}
                />
                <SystemComponent display="flex" overflow="hidden">
                    <SideNavContainer>
                        <SideNavMenu></SideNavMenu>
                    </SideNavContainer>
                    <Card overflow="auto" width={['90vw', '85vw', '100%']} flexGrow={1}>
                        <SettingsDiv title="Teams &amp; Responsibilities" 
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.TEAMS_RESPONSIBILITIES); 
                            }
                        }>
                            <SettingsDivSubsection headerText='My Subteams'
                                type='anchorlist'
                                isLabelListSection={true}
                                labelValues={subteams}
                                labelStyleVariants={subteams.map(subteam => lowerCase(subteam))}
                            />
                            <SettingsDivSubsection headerText='My Projects'
                                type='list'
                                isLabelListSection={true}
                                labelValues={projects}
                            />
                            <SettingsDivSubsection headerText='What do I do on Teamhub ?' type='normal'>
                                <NonEditableTextArea>
                                    {bio} 
                                </NonEditableTextArea>
                            </SettingsDivSubsection>
                        </SettingsDiv>


                        <SettingsDiv title="Profile Information"
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.PROFILE_INFO); 
                            }}
                        >
                            <ProfileSummary />
                            <SettingsDivSubsection headerText='My Skills'
                                type="list"
                                isLabelListSection={true}
                                labelValues={skills}
                            />
                            <SettingsDivSubsection headerText='My Interests'
                                type="list"
                                isLabelListSection={true}
                                labelValues={interests}
                            />
                            <SettingsDivSubsection headerText='Short Bio'
                                type="normal"
                                isLabelListSection={false}
                            />
                        </SettingsDiv>

                        <SettingsDiv title="Edit External Accounts"
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.EXTERNAL_LINKS); 
                            }}
                        >
                            <ThreeColumnGrid>
                                {externalLinks.map((url, i) =>
                                    <> 
                                        <SystemComponent gridColumn="1 / 2" 
                                            gridRow={(i+1).toString().concat(" / span 1")}
                                        >
                                            <Header5>
                                                {externalLinkLabels[i]}
                                            </Header5>
                                        </SystemComponent>
                                        <SystemComponent 
                                            gridColumn="2 / 3" 
                                            gridRow={(i+1).toString().concat(" / span 1")}
                                            textAlign="right"
                                        >
                                            <NonUnderlinedLink href={url} alt={altText[i]}>
                                                {url}
                                            </NonUnderlinedLink>
                                        </SystemComponent>
                                    </>
                                )}
                            </ThreeColumnGrid>
                        </SettingsDiv>
                    </Card>
                </SystemComponent>
            </>
        </PageTemplate>
    )
};
export default Home;