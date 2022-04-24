import React from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/LoginCard';
import { useRouter } from 'next/router';
import useShouldRedirect from '../../frontend/hooks/useShouldRedirect';


export default () => {
    const router = useRouter();

    return (
        <>
            <PageTemplate>
                <Login 
                    onFinish={(user) => {
                        if (user) {
                            useShouldRedirect(user.userData, router, user.isExistingUser)
                        }
                    }} 
                />
            </PageTemplate>
        </>
    )
}
    
