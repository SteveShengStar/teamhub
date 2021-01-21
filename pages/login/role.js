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

import {removeBadValuesAndDuplicates} from '../../frontend/helpers';

const Role = () => {
    const { user, token, hydrated } = useSelector(state => state.userState);
    const filters = useSelector(state => state.membersState.filters);
    const router = useRouter();
    
    const [ selectedSubteams, setSelectedSubteams ] = useState(user && user.subteams && filters.subteams ? user.subteams.map(subteam => {
        const found = filters.subteams.findIndex(st => st._id == subteam)
        return found >= 0 ? found : 0
    }) : []);
    const [ selectedProjects, setSelectedProjects ] = useState(user && user.projects && filters.projects ? user.projects.map(project => {
        const found = filters.projects.find(proj => proj._id == project)
        return [found && found.name || ""];
    }) : []);

    const [ selectedRole, setSelectedRole ] = useState(user && user.memberType ? { value: user.memberType._id, label: user.memberType.name } : {});
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedSubteams(user && user.subteams && filters.subteams ? user.subteams.map(subteam => {
            const found = filters.subteams.findIndex(st => st._id == subteam)
            return found >= 0 ? found : 0
        }) : []);
        setSelectedProjects(user && user.projects && filters.projects ? user.projects.map(project => {
            const found = filters.projects.find(proj => proj._id == project)
            return [found && found.name || ""];
        }) : []);

        setSelectedRole(user && user.memberType ? { value: user.memberType._id, label: user.memberType.name } : {});
    }, [filters])

    const checkErrors = () => {
        if (!selectedRole.value) {
            window.alert("No role was specified!")
            return false;
        }
        if (selectedSubteams.length == 0) {
            window.alert("No subteam was selected!")
            return false;
        }
        if (selectedProjects.length > 0 && selectedProjects.includes(undefined)) {
            window.alert("Some projects you specified are blank strings. That is now allowed !")
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
    useLoginController(loginTransition, dispatch, router.pathname)

    const trySubmit = () => {
        if (!checkErrors()) return;
    
        loginTransition.setVisible(false);
        updateUser(dispatch, {
            subteams: selectedSubteams.map(index => filters.subteams[index].name),
            projects: removeBadValuesAndDuplicates(selectedProjects),
            memberType: selectedRole.label
        }, token, user._id, router).then(() => {
            router.push("/login/about");
        }).catch((e) => {
            console.log(e);
        })
    }
    return (
        <>
            <PageTemplate title="Onboarding">
                <LoginTransition transitionRef={loginTransition.ref}>
                    <OnboardingRoleCard 
                        subteamOptions={filters.subteams || []}
                        roleOptions={filters.roles || []}
                        selectedSubteams={selectedSubteams} 
                        selectedProjects={selectedProjects}
                        setSelectedProjects={setSelectedProjects}
                        setSelectedSubteams={setSelectedSubteams}
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