import React from 'react';
import styled from 'styled-components';
import Header5 from '../../atoms/Header5';
import Image from '../../atoms/Image';
import { SystemComponent } from '../../atoms/SystemComponents';

import theme from '../../theme';

// TODO: Set actual image URL later
const imageUrl = undefined;
const Grid = styled(SystemComponent)`
    display: grid;
    width: 85vw;
    grid-template-columns: 100%;
    grid-template-rows: ${(props) => props.leftColumnWidth};
    justify-items: center;
    & table {
        width: 80vw;
        margin-top: ${(props) => props.theme.space[3]}px;
    }
    & .avatarContainer {
        width: 100%;
        text-align: center;
    }

    @media screen and (min-width: 420px) {
        & table {
            width: 380px;
        }
    }

    ${theme.mediaQueries.mobile} {
        & table {
            width: 340px;
            margin-top: ${(props) => props.theme.space[0]}px;
            position: static;
        }
        & .avatarContainer {
            text-align: left;
        }
        width: inherit;

        grid-template-columns: ${(props) => props.leftColumnWidth} auto;
        grid-template-rows: ${(props) => props.leftColumnWidth};
    }
`;

const AvatarWrapperComponent = ({ children }) => {
    return (
        <Grid leftColumnWidth='140px'>
            <SystemComponent className='avatarContainer'>
                {children[0]}
            </SystemComponent>
            <SystemComponent>{children[1]}</SystemComponent>
        </Grid>
    );
};

const ProfileSummary = ({
    firstname = '',
    lastname = '',
    program = '',
    email = '',
}) => {
    const faClassnames = [
        'fa-solid fa-user',
        'fa-solid fa-user',
        'fa-graduation-cap',
        'fa-graduation-cap',
        'fa-envelope',
    ];
    const userInformation = {
        firstName: {
            label: 'First Name',
            value: firstname,
        },
        lastName: {
            label: 'Last Name',
            value: lastname,
        },
        program: {
            label: 'Program',
            value: program,
        },
        email: {
            label: 'Email',
            value: email,
        },
    };

    return (
        <AvatarWrapperComponent>
            <Image
                height='100%'
                src={imageUrl || '/static/default-headshot.png'}
                borderRadius='18px'
            />
            <SystemComponent overflowY='auto'>
                <table>
                    <tbody>
                        {Object.values(userInformation).map((fieldInfo, i) => (
                            <tr key={i}>
                                <td className={'fa ' + faClassnames[i]}></td>
                                <td>
                                    <Header5>{fieldInfo.label}</Header5>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    {fieldInfo.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </SystemComponent>
        </AvatarWrapperComponent>
    );
};
export default ProfileSummary;
