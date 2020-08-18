import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {ACTIVE_MODAL} from '../frontend/components/constants';
import Card from '../frontend/components/atoms/Card';
import Header5 from '../frontend/components/atoms/Header5';

import {SystemComponent, SystemLink} from '../frontend/components/atoms/SystemComponents';
import SettingsSubsection from '../frontend/components/molecules/SettingsSubsection';
import ProfileSummary from '../frontend/components/molecules/AccountSettings/ProfileSummary';
import SettingsModalSelector from '../frontend/components/atoms/SettingsModalSelector';
import EditableSectionHeader from '../frontend/components/molecules/AccountSettings/EditableSectionHeader';

import member from '../frontend/mockdata/member';
import {lowerCase, capitalize} from 'lodash';

import PageTemplate from '../frontend/components/templates/PageTemplate';
import theme from '../frontend/components/theme';
import {getProfileInfo} from '../frontend/store/reducers/userReducer';


const refIds = ["teams_resp", "profile_info", "ext_links"];

const SettingsComponentBody = styled(SystemComponent)`
    padding-left: ${props => props.theme.space.settingsSubsectionPadding}px;
    display: grid;
    grid-row-gap: ${props => props.theme.space[3]}px;
    margin-bottom: ${props => props.theme.space[5]}px;
`;

// TODO: Add images to make this 3 columns
const ThreeColumnGrid = styled(SystemComponent)`
    display: grid;
    grid-template-columns: 20px 150px auto;
    grid-auto-rows: minmax(30px, auto);

    ${theme.mediaQueries.mobile} {
        grid-template-columns: 20px 150px 350px;
    }
`;

const NonUnderlinedLink = styled(SystemLink)`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const AddInfoPrompt = styled(SystemLink)`
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
        cursor: pointer; 
        opacity: 0.7;
    }
`;

const SettingsContainer = styled(Card)`
    box-sizing: border-box;
    overflow-y: auto;
    max-width: 768px;
    width: 100%;
`;

const SettingsComponent = ({children, title, onEditClicked, refId}) => {
    return (
        <>
            <EditableSectionHeader 
                title={title} 
                handleEditClicked={onEditClicked} 
                refId={refId}
            />
            <SettingsComponentBody>
                {children}
            </SettingsComponentBody>
        </>
    );
};

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

    // TODO: Make sure that user can only get to this page if logged in already
    const skills = (isLoaded && user.skills) ? user.skills.map(s => s.name) : [];
    const projects = (isLoaded && user.projects) ? user.projects.map(p => p.description[0]) : [];
    // TODO: check this later
    
    const subteams = (isLoaded && user.subteams) ? user.subteams.map(s => s.name) : [];
    console.log("Subteams")
    console.log(subteams)
    const interests = (isLoaded && user.interests) ? user.interests.map(i => i.name) : []; 
    const roleDescription = member.roleDescription;
    const links = user.links ? user.links : [];

    
    const linkLabelIcons = ['fa-globe', 'fa-linkedin', 'fa-github', 'fa-facebook-square'] // CSS Class names of font-awesome icons
    const accountTypes = ["website", 'linkedin', 'github', 'facebook'];
    const altText = {
        "website": "Personal Website",
        "linkedin": "Linkedin Profile",
        "github": "Github Profile",
        "facebook": "Facebook Profile"
    };

    return (
        <PageTemplate>
            <>
                <SettingsModalSelector  
                    activeModal={activeModal}
                    handleCloseModal={handleCloseModal}
                    isLoaded={isLoaded}
                />
                <SystemComponent display="flex" overflow="hidden">
                    <SettingsContainer>
                        <SettingsComponent title="Teams &amp; Responsibilities"
                            refId={refIds[0]}
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.TEAMS_RESPONSIBILITIES); 
                            }
                        }>
                            <SettingsSubsection headerText='My Subteams'
                                type='anchorlist'
                                isLabelListSection={true}
                                labelValues={subteams}
                                labelStyleVariants={subteams.map(subteam => lowerCase(subteam))}
                            />
                            <SettingsSubsection headerText='My Projects'
                                type='list'
                                isLabelListSection={true}
                                labelValues={projects}
                            />
                            <SettingsSubsection headerText='What do I do on Teamhub ?' type='normal'>
                                <SystemComponent width="100%">
                                    {roleDescription} 
                                </SystemComponent>
                            </SettingsSubsection>
                        </SettingsComponent>


                        <SettingsComponent title="Profile Information"
                            refId={refIds[1]}
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.PROFILE_INFO); 
                            }}
                        >
                            <SystemComponent mb={2}>
                                {isLoaded && user ? 
                                    (
                                        <ProfileSummary 
                                            isLoaded={isLoaded}
                                            firstname={user.name ? user.name.first : ""}
                                            lastname={user.name ? user.name.last : ""}
                                            birthday={user.birthday}
                                            program={user.program}
                                            schoolterm={user.stream ? user.stream.currentSchoolTerm : ""}
                                            email={user.email}
                                        />
                                    ) : (
                                        <ProfileSummary 
                                            isLoaded={isLoaded}
                                        />
                                    )
                                }
                            </SystemComponent>
                            <SettingsSubsection headerText='My Skills'
                                type="list"
                                isLabelListSection={true}
                                labelValues={skills}
                            />
                            <SettingsSubsection headerText='My Interests'
                                type="list"
                                isLabelListSection={true}
                                labelValues={interests}
                            />
                            <SettingsSubsection headerText='Short Bio'
                                type="normal"
                                isLabelListSection={false}
                            >
                                {user.bio}
                            </SettingsSubsection>
                        </SettingsComponent>

                        <SettingsComponent title="External Accounts"
                            refId={refIds[2]}
                            onEditClicked={() => {
                                setActiveModal(ACTIVE_MODAL.EXTERNAL_LINKS); 
                            }}
                        >
                            <ThreeColumnGrid>
                                {
                                    accountTypes.map((acctType, i) =>
                                    <> 
                                        <SystemComponent gridColumn="1 / 2"><i className={"fa " + linkLabelIcons[i]}/></SystemComponent>
                                        <SystemComponent gridColumn="2 / 3" 
                                            gridRow={(i+1).toString().concat(" / span 1")}
                                        >
                                            <Header5>
                                                {capitalize(acctType)}
                                            </Header5>
                                        </SystemComponent>
                                        <SystemComponent 
                                            gridColumn="3 / 4" 
                                            gridRow={(i+1).toString().concat(" / span 1")}
                                            textAlign="right"
                                        >
                                            {(links.find(link => link.type === acctType) && 
                                                (links.find(link => link.type === acctType).link.length > 0)) ? (
                                                <NonUnderlinedLink 
                                                    href={links.find(link => link.type === acctType).link} 
                                                    alt={altText[acctType]} 
                                                    target="_blank"
                                                >
                                                    {links.find(link => link.type === acctType).link}
                                                </NonUnderlinedLink>
                                            ) : (
                                                <AddInfoPrompt alt={altText[acctType]} onClick={e => setActiveModal(ACTIVE_MODAL.EXTERNAL_LINKS)}>
                                                    {"[ Add an Account ]"}
                                                </AddInfoPrompt>
                                            )}
                                        </SystemComponent>
                                    </>
                                )}
                            </ThreeColumnGrid>
                        </SettingsComponent>
                    </SettingsContainer>
                </SystemComponent>
            </>
        </PageTemplate>
    )
};
export default Home;