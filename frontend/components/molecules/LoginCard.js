import React from 'react';
import GoogleLogin from 'react-google-login';

import Header2 from '../atoms/Header2';
import Header4 from '../atoms/Header4';
import Card from '../atoms/Card';
import styled from 'styled-components';
import { SystemComponent } from '../atoms/SystemComponents';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/reducers/userReducer';

const Login = ({onFinish, loginRef}) => {
    const dispatch = useDispatch()
    function responseGoogle(response) {
        if (response.error) return;
        userLogin(response, dispatch).then((user) => {
            onFinish && onFinish(user);
        })
    }
    return (
        <LoginCard ref={loginRef}>
            <SystemComponent m={7}>
                <Header2 mb={6}>
                    Log In
                </Header2>
                <Header4 mb={3}>
                    Login with your Waterloop Email
                </Header4>
                <GoogleLogin
                    style={{ fontFamily: 'Nunito Sans' }}
                    clientId="404915833701-5kvp9td9jonstfsola74atmkjct4h00d.apps.googleusercontent.com"
                    buttonText="Sign In"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    scope="profile email https://www.googleapis.com/auth/calendar.events"
                />
            </SystemComponent>
        </LoginCard>
    );
};
export default Login;

const LoginCard = styled(Card)`
    position: relative;
    
    ${props => props.theme.mediaQueries.smallDesktop} {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`
