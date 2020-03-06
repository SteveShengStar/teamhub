import React, { useState } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/loginCard';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


export default () => {
    const router = useRouter();
    return (
        <PageTemplate myHubHidden={true}>
            <LoginTransition>
                <Login onFinish={() => {
                    router.push("/login/onboarding1")
                }}/>
            </LoginTransition>
        </PageTemplate>
    )
}
    
