import React from 'react';
import { useSelector } from 'react-redux';

import { ACTIVE_MODAL } from '../../frontend/components/constants';
import { SystemComponent } from '../../frontend/components/atoms/SystemComponents';
import SettingsSection from '../../frontend/components/molecules/AccountSettings/SettingsSection';
import SettingsSubsection from '../../frontend/components/molecules/SettingsSubsection';
import ProfileSummary from '../../frontend/components/molecules/AccountSettings/ProfileSummary';

const UserProfileSection = ({
    sectionTitle,
    setActiveModal,
    userDataLoaded,
}) => {
    const { user } = useSelector((state) => state.userState);
    const skills =
        userDataLoaded && user.skills ? user.skills.map((s) => s.name) : [];
    const interests =
        userDataLoaded && user.interests
            ? user.interests.map((i) => i.name)
            : [];

    return (
        <SettingsSection
            title={sectionTitle}
            onEditClicked={() => {
                setActiveModal(ACTIVE_MODAL.PROFILE_INFO);
            }}
        >
            <SystemComponent mb={2}>
                {userDataLoaded && (
                    <ProfileSummary
                        firstname={user.name && user.name.first}
                        lastname={user.name && user.name.last}
                        program={user.program}
                        email={user.email}
                    />
                )}
            </SystemComponent>
            <SettingsSubsection
                headerText='My Skills'
                type='list'
                labelValues={skills}
                defaultDisplayText='No Skills to show. Click Edit to add skills.'
            />
            <SettingsSubsection
                headerText='My Interests'
                type='list'
                labelValues={interests}
                defaultDisplayText='No Interests to show. Click Edit to add personal interests.'
            />
            <SettingsSubsection
                headerText='Short Bio'
                type='normal'
                defaultDisplayText='Click Edit to add a bio about yourself.'
            >
                {user.bio ? user.bio : 'Click Edit (above) to add a short bio.'}
            </SettingsSubsection>
        </SettingsSection>
    );
};
export default UserProfileSection;
