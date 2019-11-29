import React from 'react';
import styled from 'styled-components';

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

const Name = () => (
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
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Header2
                    style={{
                        textAlign: 'left',
                        marginBottom: '25px'
                    }}
                >
          Hello!
                </Header2>
                <Header4
                    style={{
                        textAlign: 'left',
                        marginBottom: '10px'
                    }}
                >
          What's your preferred name?
                </Header4>
                <form
                    style={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                    }}
                >
                    <CustomInput />
                </form>
                <Button
                    style={{
                        alignSelf: 'flex-end',
                        marginTop: '25px'
                    }}
                >
          Continue
                </Button>
            </div>
        </Card>
    </div>
);

export default Name;

const CustomInput = styled(Input)`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  font-size: 28px;
  &:focus {
    border-bottom: 1px solid black;
    outline: none;
  }
`;
