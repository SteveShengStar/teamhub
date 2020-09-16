import React, { useState, useContext, useEffect } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/LoginCard';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import useLoginTransition from '../../frontend/hooks/useLoginTransition';
import api from '../../frontend/store/api';
import useLoginController from '../../frontend/hooks/useLoginController';
import { UserTypes } from '../../frontend/store/reducers/userReducer';
import useRedirect from '../../frontend/hooks/useRedirect';
import LoadingModal from '../../frontend/components/atoms/LoadingModal';
import { ThemeContext } from 'styled-components';
import LoginTransition from '../../frontend/components/templates/LoginTransition';


export default () => {
    const theme = useContext(ThemeContext);
    const router = useRouter();
    const dispatch = useDispatch()
    const loginTransition = useLoginTransition()   // The animation that will play when moving to the next page of the signup form
    useLoginController(loginTransition, dispatch, router.pathname)

    return (
        <>
            <PageTemplate myHubHidden={true}>
                <LoginTransition transitionRef={loginTransition.ref}>
                    <Login 
                        shouldHide={() => {
                            loginTransition.setVisible(false)
                        }} 
                        onFinish={(user) => {
                            dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user })
                            useRedirect(user, router)
                        }} 
                    />
                </LoginTransition>
            </PageTemplate>
            <LoadingModal visible={!loginTransition.visible} color={theme.colors.black}/>
        </>
    )
}
    
