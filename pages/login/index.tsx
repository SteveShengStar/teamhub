import React, { useContext } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import { LoginCard } from '../../frontend/components/molecules/LoginCard';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useLoginTransition from '../../frontend/hooks/useLoginTransition';
import useLoginController from '../../frontend/hooks/useLoginController';
import { UserTypes } from '../../frontend/store/reducers/userReducer';
import useRedirect from '../../frontend/hooks/useRedirect';
import LoadingModal from '../../frontend/components/atoms/LoadingModal';
import { ThemeContext } from 'styled-components';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
// TODO(kevin) remove any cast
const PageTemplateAsAny = PageTemplate as any


export default () => {
    const theme = useContext(ThemeContext);
    const router = useRouter();
    const dispatch = useDispatch()
    const loginTransition = useLoginTransition()
    useLoginController(loginTransition, dispatch, router.pathname)

    return (
        <>
            <PageTemplateAsAny myHubHidden={true}>
                { /* TODO(kevin) fix any cast */ }
                <LoginTransition transitionRef={loginTransition.ref as any}>
                    <LoginCard 
                        shouldHide={() => {
                            loginTransition.setVisible(false)
                        }} 
                        onFinish={(user) => {
                            dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user })
                            useRedirect(user, router)
                        }} 
                    />
                </LoginTransition>
            </PageTemplateAsAny>
            <LoadingModal visible={!loginTransition.visible} color={theme.colors.black}/>
        </>
    )
}
    
