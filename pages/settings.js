import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ACTIVE_MODAL } from '../frontend/components/constants';
import Card from '../frontend/components/atoms/Card';

import { SystemComponent } from '../frontend/components/atoms/SystemComponents';
import SettingsModalSelector from '../frontend/components/atoms/SettingsModalSelector';

import PageTemplate from '../frontend/components/templates/PageTemplate';
import { getProfileInfo } from '../frontend/store/reducers/userReducer';

import TeamsSection from './settings/teams';
import UserProfileSection from './settings/userprofile';
import LinksSection from './settings/links';
import useStatelessLoadingScreen from '../frontend/hooks/useStatelessLoadingScreen';
import ConfirmationBanner from '../frontend/components/ConfirmationBanner';
import ErrorBanner from '../frontend/components/ErrorBanner';

const Frame = styled(Card)`
    box-sizing: border-box;
    overflow-y: auto;
    max-width: 768px;
    width: 100%;
`;

const Settings = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [activeModal, setActiveModal] = useState(false);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const { hydrated, user } = useSelector((state) => state.userState);
    const [displayBanner, setDisplayBanner] = useState(false);
    const [displayErrorBanner, setDisplayErrorBanner] = useState(false);
    const [loader, showLoader, hideLoader] = useStatelessLoadingScreen(
        !userDataLoaded,
        (showLoader) => setUserDataLoaded(!showLoader)
    );

    const handleCloseModal = () => {
        setActiveModal(ACTIVE_MODAL.NONE);
    };
    const handleConfirmationBanner = () => {
        setDisplayBanner(true);
        setTimeout(() => {
            setDisplayBanner(false);
        }, 7000);
    };
    const handleErrorBanner = () => {
        setDisplayErrorBanner(true);
        setTimeout(() => {
            setDisplayErrorBanner(false);
        }, 7000);
    };
    useEffect(async () => {
        if (hydrated) {
            // setTimeout(function(){
            await getProfileInfo(dispatch, user._id, router);
            hideLoader();
            // }, 2000);
        }
    }, [hydrated]);

    return (
        <PageTemplate title='Profile Settings'>
            <>
                <ConfirmationBanner
                    displayBanner={displayBanner}
                    text={['Profile Information successfully updated !']}
                />
                <ErrorBanner
                    displayErrorBanner={displayErrorBanner}
                    text={[
                        'Failed to save information. Please contact Waterloop web team for assistance',
                    ]}
                />
                <SettingsModalSelector
                    activeModal={activeModal}
                    handleCloseModal={handleCloseModal}
                    handleConfirmationBanner={handleConfirmationBanner}
                    handleErrorBanner={handleErrorBanner}
                />
                <SystemComponent display='flex' overflow='hidden' margin='auto'>
                    <Frame position='relative'>
                        {loader}
                        <TeamsSection
                            sectionTitle='Teams &amp; Responsibilities'
                            setActiveModal={setActiveModal}
                            userDataLoaded={userDataLoaded}
                        />
                        <UserProfileSection
                            sectionTitle='Profile Information'
                            setActiveModal={setActiveModal}
                            userDataLoaded={userDataLoaded}
                        />
                        <LinksSection
                            sectionTitle='Links'
                            setActiveModal={setActiveModal}
                            userDataLoaded={userDataLoaded}
                        />
                    </Frame>
                </SystemComponent>
            </>
        </PageTemplate>
    );
};
export default Settings;
