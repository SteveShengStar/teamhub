import React, { useContext } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/LoginCard';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useLoginController from '../../frontend/hooks/useLoginController';
import { UserTypes } from '../../frontend/store/reducers/userReducer';
import useShouldRedirect from '../../frontend/hooks/useShouldRedirect';
import LoadingModal from '../../frontend/components/atoms/LoadingModal';
import { ThemeContext } from 'styled-components';


const LoginHome = () => {
    const theme = useContext(ThemeContext);
    const router = useRouter();
    const dispatch = useDispatch()
    useLoginController(dispatch, router.pathname)

    return (
        <>
            <PageTemplate>
                <Login
                    onFinish={(user, redirectUrl) => {
                        dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user })
                        useShouldRedirect(user, router, redirectUrl)
                    }} 
                />
            </PageTemplate>
        </>
    )
}
export default LoginHome;