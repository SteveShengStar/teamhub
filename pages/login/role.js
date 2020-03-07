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


const termMap = {
    "F": "Fall",
    "S": "Spring",
    "W": "Winter"
}

export default () => {
    const user = useSelector(state => state.userState.user);
    const filters = useSelector(state => state.membersState.filters);
    const router = useRouter();
    
    const [ shouldHide, setShouldHide ] = useState(false);

    const [ selectedSubteams, setSelectedSubteams ] = useState(user && user.subteams ? user.subteams.map(subteam => subteam.name) : []);
    const [ selectedProjects, setSelectedProjects ] = useState(user && user.projects ? user.projects.map(project => [project.project, project.description]) : []);
    const [ selectedYear, setSelectedYear ] = useState(user && user.joined ? `${user.joined.season[0]}${user.joined.year - 2000}` : "F19");
    const [ selectedRole, setSelectedRole ] = useState(user && user.memberType ? { value: user.memberType._id, label: user.memberType.name } : {});
    const dispatch = useDispatch();


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
        getFilters(dispatch, window.localStorage.getItem("refreshToken"))
    }, [])

    const trySubmit = () => {
        if (!checkErrors()) return;
        setShouldHide(true);
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
        }, window.localStorage.getItem("refreshToken"), user._id).then(() => {
            router.push("/login/about");
        })
    }
    return (
        <>
            <PageTemplate myHubHidden={true} title="Onboarding">
                <LoginTransition shouldHide={shouldHide}>
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
        </>
    )
}

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