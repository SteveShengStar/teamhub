import React, { useState, useEffect } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/loginCard';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import OnboardingRoleCard from '../../frontend/components/organisms/OnboardingRoleCard';


export default () => {
    const user = useSelector(state => state.userState)
    return (
        <PageTemplate myHubHidden={true}>
            <LoginTransition>
                <OnboardingRoleCard />
            </LoginTransition>
        </PageTemplate>
    )
}
    
