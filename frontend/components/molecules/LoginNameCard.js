import React from 'react';
import styled from 'styled-components';

import Button from '../atoms/Button';
import Header2 from '../atoms/Header2';
import Header4 from '../atoms/Header4';
import Card from '../atoms/Card';
import Input from '../atoms/Input';

export default ({submit, nameInput, setNameInput}) => (
    <ICard>
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
                onSubmit={e => {
                    e.preventDefault();

                }}
            >
                <CustomInput value={nameInput} onChange={e => setNameInput(e.target.value)}/>
            </form>
            <Button
                style={{
                    alignSelf: 'flex-end',
                    marginTop: '25px'
                }}
                onClick={submit}
            >
                Continue
            </Button>
        </div>
    </ICard>
);

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

const ICard = styled(Card)`
    ${props => props.theme.mediaQueries.tablet} {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`
