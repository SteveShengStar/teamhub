import React from 'react';
import styled from 'styled-components';
import Header5 from '../../atoms/Header5';
import Image from '../../atoms/Image';
import {SystemComponent} from '../../atoms/SystemComponents';
import member from '../../../mockdata/member';

import theme from '../../theme';

// TODO: Set actual image URL later
// TODO: Use server data
const imageUrl = undefined;
const Grid = styled(SystemComponent)`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: ${props => props.leftColumnWidth};
    justify-items: center;
    & table {
        width: 80vw;
    }
    & .avatarContainer {
        width: 100%;
        text-align: center;
    }

    @media screen and (min-width: 420px) {
        & table {
            width: 390px;
        }
    }

    ${theme.mediaQueries.mobile} {
        & table {
            width: 320px;
        }
        & .avatarContainer {
            text-align: left;
        }

        grid-template-columns: calc(${props => props.leftColumnWidth} - 40px) auto;
        grid-template-rows: calc(${props => props.leftColumnWidth} - 40px);
    }
    @media screen and (min-width: 690px) {
        & table {
            width: 390px;
        }

        grid-template-columns: ${props => props.leftColumnWidth} auto ;
        grid-template-rows: ${props => props.leftColumnWidth};
    }
    ${theme.mediaQueries.tablet} {
        & .avatarContainer {
            text-align: center;
        }

        grid-template-columns: 100%;
        grid-template-rows: ${props => props.leftColumnWidth} ${props => props.leftColumnWidth};
    }
    @media screen and (min-width: 935px) {
        & .avatarContainer {
            text-align: left;
        }
        & table {
            width: 340px;
        }

        grid-template-columns: calc(${props => props.leftColumnWidth} - 40px) auto;
        grid-template-rows: calc(${props => props.leftColumnWidth} - 40px);
    }
    @media screen and (min-width: 1015px) {
        & table {
            width: 390px;
        }
        grid-template-columns: ${props => props.leftColumnWidth} auto;
        grid-template-rows: ${props => props.leftColumnWidth};
    }
    ${theme.mediaQueries.desktop} {
        & table {
            width: 320px;
        }
        grid-template-columns: calc(${props => props.leftColumnWidth} - 40px) auto;
        grid-template-rows: calc(${props => props.leftColumnWidth} - 40px);
    }
    @media screen and (min-width: 1270px) {
        justify-items: left;
        & table {
            margin-left: ${props => props.theme.space[4]}px;
        }
    }
    @media screen and (min-width: 1320px) {
        & table {
            width: 360px;
        }
        grid-template-columns: calc(${props => props.leftColumnWidth} - 20px) auto;
        grid-template-rows: calc(${props => props.leftColumnWidth} - 20px);
    }
    @media screen and (min-width: 1400px) {
        & table {
            width: 390px;
        }
        grid-template-columns: ${props => props.leftColumnWidth} auto;
        grid-template-rows: ${props => props.leftColumnWidth};
    }
`;

let birthday = member.birthday ? new Date(2019, member.birthday.month, member.birthday.day) : new Date();
birthday = birthday.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

const userInformation = {
    firstName: {
        label: 'First Name',
        value: member.name.first
    },
    lastName: {
        label: "Last Name",
        value: member.name.last
    },
    birthDay: {
        label: "Birthday",
        value: birthday
    },
    program: {
        label: "Program",
        value: member.program
    },
    term: {
        label: "Term",
        value: member.currentSchoolTerm
    },
    email: {
        label: "Email",
        value: member.email
    }
};

// TODO: using styled component may be better
// because I never pass parameters that actually configure properties of this container.
const SettingsHorizontalFlexbox = ({ children, leftChildWidth }) => {
    return (
        <Grid leftColumnWidth={leftChildWidth + "px"}>
            <SystemComponent className="avatarContainer">
                {children[0]}
            </SystemComponent>
            <SystemComponent>{children[1]}</SystemComponent>
        </Grid>
    );
};

// TODO: insert icons to the left of the labels
const ProfileSummary = () => {

    return (
        <SettingsHorizontalFlexbox leftChildWidth={200}>
            <Image
                height='100%'
                src={imageUrl || "/static/default-headshot.png"}
                borderRadius="18px"
            />
            <SystemComponent overflowY='auto'>
                <table>
                    <tbody>
                        {Object.values(userInformation).map((fieldInfo, i) =>
                            <tr key={i}>
                                <td></td>
                                <td><Header5>{fieldInfo.label}</Header5></td>
                                <td style={{textAlign: 'right'}}>{fieldInfo.value}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </SystemComponent>
        </SettingsHorizontalFlexbox>
    );
}
export default ProfileSummary;
