import React from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/LoginCard';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { UserTypes } from '../../frontend/store/reducers/userReducer';
import useShouldRedirect from '../../frontend/hooks/useShouldRedirect';


export default () => {
    const router = useRouter();
    const dispatch = useDispatch()

    return (
        <>
            <PageTemplate>
                <Login 
                    onFinish={(user) => {
                        dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user })
                        useShouldRedirect(user, router)
                    }} 
                />
            </PageTemplate>
        </>
    )
}
    
