import React, { useState, useEffect } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/LoginCard';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


export default () => {
    const router = useRouter();
    const [ shouldHide, setShouldHide ] = useState(false);

    return (
        <PageTemplate myHubHidden={true}>
            <LoginTransition shouldHide={shouldHide}>
                <Login setShouldHide={() => setShouldHide(true)} onFinish={() => {
                    setShouldHide(false);
                    setTimeout(() => router.push("/login/name"), 500);
                }}/>
            </LoginTransition>
        </PageTemplate>
    )
}
    
