import React, { useState, useEffect } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/LoginCard';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import useLoginTransition from '../../frontend/hooks/useLoginTransition';
import api from '../../frontend/store/api';
import useLoginController from '../../frontend/hooks/useLoginController';
import { UserTypes } from '../../frontend/store/reducers/userReducer';
import useRedirect from '../../frontend/hooks/useRedirect';


export default () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const loginTransition = useLoginTransition()
    useLoginController(loginTransition, dispatch, router.pathname)

    return (
        <PageTemplate myHubHidden={true}>
            <LoginTransition loginTransition={loginTransition}>
                <Login shouldHide={() => loginTransition.hide()} onFinish={(user) => {
                    dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user })
                    useRedirect(user, router)
                }} />
            </LoginTransition>
        </PageTemplate>
    )
}
    
