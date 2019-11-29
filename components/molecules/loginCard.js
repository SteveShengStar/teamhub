import React from 'react';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';

import Button from '../atoms/Button';
import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';
import Header2 from '../atoms/Header2';
import Header3 from '../atoms/Header3';
import Header4 from '../atoms/Header4';
import Body from '../atoms/Body';
import Image from '../atoms/Image';
import Card from '../atoms/Card';
import Select from '../atoms/Select';
import Input from '../atoms/Input';
import theme from '../theme';

const responseGoogle = response => {
    console.log(response);
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(response)
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    });
};

const Login = () => (
    <div>
        <Card
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <div
                style={{
                    textAlign: 'left',
                    margin: 'auto',
                    padding: '30px'
                }}
            >
                <Header2
                    style={{
                        textAlign: 'left',
                        marginBottom: '25px'
                    }}
                >
          Log In
                </Header2>
                <Header4
                    style={{
                        textAlign: 'left',
                        marginBottom: '10px'
                    }}
                >
          Login with your Waterloop Email
                </Header4>

                <GoogleLogin
                    style={{
                        textAlign: 'left',
                        fontFamily: 'Nunito Sans'
                    }}
                    clientId="404915833701-5kvp9td9jonstfsola74atmkjct4h00d.apps.googleusercontent.com"
                    buttonText="Sign In"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </Card>
    </div>
);

export default Login;
