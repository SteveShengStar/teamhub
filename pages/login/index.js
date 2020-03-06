import React, { useState } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/loginCard';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


export default () => {
    const router = useRouter();
    const [ shouldHide, setShouldHide ] = useState(false);
    return (
        <PageTemplate myHubHidden={true}>
            <LoginTransition shouldHide={shouldHide}>
                <Login shouldHide={() => setShouldHide(true)} onFinish={() => {
                    router.push("/login/name")
                }}/>
            </LoginTransition>
        </PageTemplate>
    )
}
    
