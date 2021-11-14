import React from 'react';
import { useSelector } from 'react-redux';

import {ACTIVE_MODAL} from '../../frontend/components/constants';
import {SystemComponent} from '../../frontend/components/atoms/SystemComponents';
import SettingsSection from '../../frontend/components/molecules/AccountSettings/SettingsSection';
import SettingsSubsection from '../../frontend/components/molecules/SettingsSubsection';
import ProfileSummary from '../../frontend/components/molecules/AccountSettings/ProfileSummary';

const UserProfileSection = ({sectionTitle, setActiveModal, userDataLoaded}) => {
    const { user } = useSelector(state => state.userState);
    const skills = (userDataLoaded && user.skills) ? user.skills.map(s => s.name) : [];
    const interests = (userDataLoaded && user.interests) ? user.interests.map(i => i.name) : []; 

    return (
        <SettingsSection 
            title={sectionTitle}
            onEditClicked={() => {
                setActiveModal(ACTIVE_MODAL.PROFILE_INFO); 
            }}
        >
            <SystemComponent mb={2}>
                {userDataLoaded && 
                    <ProfileSummary 
                        dataLoaded={userDataLoaded}
                        firstname={user.name && user.name.first}
                        lastname={user.name && user.name.last}
                        birthday={user.birthday}
                        program={user.program}
                        schoolterm={user.stream ? user.stream.currentSchoolTerm : ""}
                        email={user.email}
                    />
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
                {user.bio ? user.bio : "Click Edit (above) to add a short bio."}
            </SettingsSubsection>
        </SettingsSection>
    );
}
export default UserProfileSection;