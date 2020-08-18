import React, { useState, useEffect } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import { useDispatch, useSelector } from 'react-redux';
import OnboardingRoleCard from '../../frontend/components/organisms/OnboardingRoleCard';
import styled from 'styled-components';
import Button from '../../frontend/components/atoms/Button';
import { updateUser } from '../../frontend/store/reducers/userReducer';
import { getFilters } from "../../frontend/store/reducers/membersReducer"
import { useRouter } from 'next/router';
import useLoginTransition from '../../frontend/hooks/useLoginTransition';
import useLoginController from '../../frontend/hooks/useLoginController';
import LoadingModal from '../../frontend/components/atoms/LoadingModal';


const termMap = {
    "F": "Fall",
    "S": "Spring",
    "W": "Winter"
}

const Role = () => {
    const { user, token, hydrated } = useSelector(state => state.userState);
    const filters = useSelector(state => state.membersState.filters);
    const router = useRouter();
    
    const [ shouldHide, setShouldHide ] = useState(false);

    const [ selectedSubteams, setSelectedSubteams ] = useState(user && user.subteams && filters.subteams ? user.subteams.map(subteam => {
        const found = filters.subteams.findIndex(st => st._id == subteam)
        return found >= 0 ? found : 0
    }) : []);
    const [ selectedProjects, setSelectedProjects ] = useState(user && user.projects && filters.projects ? user.projects.map(project => {
        const found = filters.projects.find(proj => proj._id == project.project)
        return [found && found.name || "", project.description];
    }) : []);
    const [ selectedYear, setSelectedYear ] = useState(user && user.joined ? `${user.joined.season[0]}${user.joined.year - 2000}` : "F19");
    const [ selectedRole, setSelectedRole ] = useState(user && user.memberType ? { value: user.memberType._id, label: user.memberType.name } : {});
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedSubteams(user && user.subteams && filters.subteams ? user.subteams.map(subteam => {
            const found = filters.subteams.findIndex(st => st._id == subteam)
            return found >= 0 ? found : 0
        }) : []);
        setSelectedProjects(user && user.projects && filters.projects ? user.projects.map(project => {
            const found = filters.projects.find(proj => proj._id == project.project)
            return [found && found.name || "", project.description];
        }) : []);
        setSelectedYear(user && user.joined ? `${user.joined.season[0]}${user.joined.year - 2000}` : "F19");
        setSelectedRole(user && user.memberType ? { value: user.memberType._id, label: user.memberType.name } : {});
    }, [filters])

    const checkErrors = () => {
        if (!selectedRole.value) {
            window.alert("No role specified!")
            return false;
        }
        if (selectedSubteams.length == 0) {
            window.alert("No subteams selected!")
            return false;
        }
        if (selectedProjects.length == 0) {
            window.alert("No projects selected!")
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (token && !filters.projects) {
            getFilters(dispatch, token, router)
        }
    }, [hydrated])

    const loginTransition = useLoginTransition()
    // console.log("Select Subteams")
    // console.log(selectedSubteams)
    // console.log("Filters")
    // console.log(filters.subteams)
    console.log("Select Subteams")
    console.log(selectedSubteams.map(index => filters.subteams[index].name))
    console.log("Filters")
    console.log(selectedProjects.map(project => {
        return {
            project: project[0],
            description: project[1]
        }
    }));
    useLoginController(loginTransition, dispatch, router.pathname)

    const trySubmit = () => {
        console.log("******* Reached here 1 *******")
        if (!checkErrors()) return;
        console.log("******* Reached here 2 *******")
        loginTransition.setVisible(false);
        console.log("******* Reached here 3 *******")
        updateUser(dispatch, {
            subteams: selectedSubteams.map(index => filters.subteams[index].name),
            projects: selectedProjects.map(project => {
                return {
                    project: project[0],
                    description: project[1]
                }
            }),
            memberType: selectedRole.label,
            joined: {
                season: termMap[selectedYear[0]],
                year: parseInt('20' + selectedYear.slice(1))
            }
        }, token, user._id, router).then(() => {
            router.push("/login/about");
        }).catch((e) => {
            console.log(e);
        })
        console.log("******* Reached here 4 *******");
    }
    return (
        <>
            <PageTemplate myHubHidden={true} title="Onboarding">
                <LoginTransition transitionRef={loginTransition.ref}>
                    <OnboardingRoleCard 
                        subteamOptions={filters.subteams || []}
                        roleOptions={filters.roles || []}
                        selectedSubteams={selectedSubteams} 
                        selectedProjects={selectedProjects}
                        setSelectedProjects={setSelectedProjects}
                        setSelectedSubteams={setSelectedSubteams}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        selectedRole={selectedRole}
                        setSelectedRole={setSelectedRole}
                        submit={trySubmit}
                    />
                </LoginTransition>
            </PageTemplate>
            <Row>
                <ContinueButton justifySelf="end" onClick={trySubmit}>Continue</ContinueButton>
            </Row>
            <LoadingModal visible={!loginTransition.visible} />
        </>
    )
}
export default Role;

const Row = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10px;
    display: grid;
    justify-items: end;
    background-color: rgba(255,255,255,0.37);
    ${props => props.theme.mediaQueries.tablet} {
        display: none;
    }
    backdrop-filter: blur(13px);
`

const ContinueButton = styled(Button)`
    ${props => props.theme.mediaQueries.tablet} {
        position: relative;
    }
`