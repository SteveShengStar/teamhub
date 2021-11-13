import React from 'react';
import { useSelector } from 'react-redux';
import {ACTIVE_MODAL} from '../../frontend/components/constants';

import SettingsSection from '../../frontend/components/molecules/AccountSettings/SettingsSection';
import SettingsSubsection from '../../frontend/components/molecules/SettingsSubsection';

const TeamsSection = ({sectionTitle, setActiveModal, userDataLoaded}) => {
    const { user } = useSelector(state => state.userState);
    const subteams = (userDataLoaded && user.subteams) ? user.subteams.map(subteam => subteam.name) : [];
    const projects = (userDataLoaded && user.projects) ? user.projects.map(p => p.name) : [];

    return (
        <SettingsSection title={sectionTitle}
            onEditClicked={() => {
                setActiveModal(ACTIVE_MODAL.TEAMS_RESPONSIBILITIES); 
            }}
        >
            <SettingsSubsection headerText='My Subteams'
                type='list'
                isLabelListSection={true}
                labelValues={subteams}
            />
            <SettingsSubsection headerText='My Projects'
                type='list'
                isLabelListSection={true}
                labelValues={projects}
            />
        </SettingsSection>
    )
}
export default TeamsSection;