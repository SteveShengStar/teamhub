import React, { useContext } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/LoginCard';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useLoginTransition from '../../frontend/hooks/useLoginTransition';
import useLoginController from '../../frontend/hooks/useLoginController';
import { UserTypes } from '../../frontend/store/reducers/userReducer';
import useShouldRedirect from '../../frontend/hooks/useShouldRedirect';
import LoadingModal from '../../frontend/components/atoms/LoadingModal';
import { ThemeContext } from 'styled-components';
import LoginTransition from '../../frontend/components/templates/LoginTransition';


const LoginHome = () => {
    const theme = useContext(ThemeContext);
    const router = useRouter();
    const dispatch = useDispatch()
    const loginTransition = useLoginTransition()
    useLoginController(loginTransition, dispatch, router.pathname)

    return (
        <>
            <PageTemplate>
                <LoginTransition transitionRef={loginTransition.ref}>
                    <Login 
                        shouldHide={() => {
                            loginTransition.setVisible(false)
                        }} 
                        onFinish={(user, redirectUrl) => {
                            dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user })
                            useShouldRedirect(user, router, redirectUrl)
                        }} 
                    />
                </LoginTransition>
            </PageTemplate>
            <LoadingModal visible={!loginTransition.visible} color={theme.colors.black}/>
        </>
    )
}
export default LoginHome;