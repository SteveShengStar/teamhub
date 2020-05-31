import React from 'react';
import GoogleLogin from 'react-google-login';

import Header2 from '../atoms/Header2';
import Header4 from '../atoms/Header4';
import Card from '../atoms/Card';
import styled from 'styled-components';
import { SystemComponent } from '../atoms/SystemComponents';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/reducers/userReducer';

interface ILoginCardProps {
    shouldHide: () => void;
    // TODO(kevin) remove any
    onFinish: (user: any) => void;
}

// TODO(kevin clean up any casts)
const SystemComponentAsAny = SystemComponent as any
const Header2AsAny = Header2 as any
const Header4AsAny = Header4 as any

export const LoginCard: React.FC<ILoginCardProps> = ({shouldHide, onFinish}) => {
    const dispatch = useDispatch()
    // TODO(kevin) remove any
    function responseGoogle(response: any) {
        if (response.error) return;
        shouldHide && shouldHide();
        userLogin(response, dispatch).then((user) => {
            onFinish && onFinish(user);
        })
    }

    return (
        <StyledLoginCard>
            <SystemComponentAsAny m={7}>
                <Header2AsAny mb={6}>
                    Log In
                </Header2AsAny>
                <Header4AsAny mb={3}>
                    Login with your Waterloop Email
                </Header4AsAny>
                <GoogleLogin
                    style={{ fontFamily: 'Nunito Sans' }}
                    clientId="404915833701-5kvp9td9jonstfsola74atmkjct4h00d.apps.googleusercontent.com"
                    buttonText="Sign In"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </SystemComponentAsAny>
        </StyledLoginCard>
    );
};

const StyledLoginCard = styled(Card)`
    position: relative;
    
    ${props => props.theme.mediaQueries.smallDesktop} {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`
