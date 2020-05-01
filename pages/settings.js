import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {ACTIVE_MODAL} from '../frontend/components/constants';
import Card from '../frontend/components/atoms/Card';
import Header5 from '../frontend/components/atoms/Header5';

import {SystemComponent, SystemLink} from '../frontend/components/atoms/SystemComponents';
import SettingsDivSubsection from '../frontend/components/molecules/SettingsDivSubsection';
import ProfileSummary from '../frontend/components/molecules/AccountSettings/ProfileSummary';
import SettingsModalSelector from '../frontend/components/atoms/SettingsModalSelector';
import EditableSectionHeader from '../frontend/components/molecules/AccountSettings/EditableSectionHeader';

import member from '../frontend/mockdata/member';
import {lowerCase, capitalize} from 'lodash';


import PageTemplate from '../frontend/components/templates/PageTemplate';
import theme from '../frontend/components/theme';
import {getProfileInfo} from '../frontend/store/reducers/userReducer';

const altText = {
    "website": "Personal Website",
    "linkedin": "Linkedin Profile",
    "github": "Github Profile",
    "facebook": "Facebook Profile"
}

const roleDescription = member.roleDescription;

const SettingsDivBody = styled(SystemComponent)`
    padding-left: ${theme.space.settingsSubsectionPadding}px;
    display: grid;
    grid-row-gap: ${theme.space[3]}px;
    margin-bottom: ${theme.space[5]}px;
`;

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
};

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

// TODO: Add images to make this 3 columns
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
    const [ isLoaded, setIsLoaded ] = useState(false);
    const { hydrated, token, user } = useSelector(state => state.userState);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setActiveModal(ACTIVE_MODAL.NONE);
    }

    useEffect(() => {
        if (hydrated && !isLoaded) {
            // TODO: store just the user id in local storage ?
            getProfileInfo(dispatch, token, user._id, router);
            if (!isLoaded) setIsLoaded(true);
        }
    }, [isLoaded, hydrated]);

    // TODO: Make sure that user can only get to this page if logged in already.
    console.log(user)
    const skills = (isLoaded && user.skills) ? user.skills.map(s => s.name) : [];
    const projects = (isLoaded && user.projects) ? user.projects.map(p => p.description[0]) : [];
    // TODO: check this later
    const subteams = (isLoaded && user.subteams) ? user.subteams.map(s => s.name) : [];
    const interests = (isLoaded && user.interests) ? user.interests.map(i => i.name) : []; 
    const links = user.links ? user.links : [];
    
    return (
        <PageTemplate>
            <>
                <SettingsModalSelector  
                    activeModal={activeModal}
                    handleCloseModal={handleCloseModal}
                    isLoaded={isLoaded}
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
                                    {roleDescription} 
                                </NonEditableTextArea>
                            </SettingsDivSubsection>
                        </SettingsDiv>


                        <SettingsDiv title="Profile Information"
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.PROFILE_INFO); 
                            }}
                        >
                            <SystemComponent mb={2}>
                                {isLoaded && user ? 
                                    (
                                        <ProfileSummary 
                                            isLoaded={isLoaded}
                                            firstname={user.name.first}
                                            lastname={user.name.last}
                                            birthday={user.birthday}
                                            program={user.program}
                                            schoolterm={user.stream.currentSchoolTerm}
                                            email={user.email}
                                        />
                                    ) : (
                                        <ProfileSummary 
                                            isLoaded={isLoaded}
                                        />
                                    )
                                }
                            </SystemComponent>
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
                            >
                                {user.bio}
                            </SettingsDivSubsection>
                        </SettingsDiv>

                        <SettingsDiv title="Edit External Accounts"
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.EXTERNAL_LINKS); 
                            }}
                        >
                            <ThreeColumnGrid>
                                {
                                    links.map((url, i) =>
                                    <> 
                                        <SystemComponent gridColumn="1 / 2" 
                                            gridRow={(i+1).toString().concat(" / span 1")}
                                        >
                                            <Header5>
                                                {capitalize(url.type)}
                                            </Header5>
                                        </SystemComponent>
                                        <SystemComponent 
                                            gridColumn="2 / 3" 
                                            gridRow={(i+1).toString().concat(" / span 1")}
                                            textAlign="right"
                                        >
                                            <NonUnderlinedLink href={url.link} alt={altText[url.type]} target="_blank">
                                                {url.link}
                                            </NonUnderlinedLink>
                                        </SystemComponent>
                                    </>
                                    )
                                }
                            </ThreeColumnGrid>
                        </SettingsDiv>
                    </Card>
                </SystemComponent>
            </>
        </PageTemplate>
    )
};
export default Home;