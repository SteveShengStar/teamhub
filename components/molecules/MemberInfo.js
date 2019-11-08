import React from 'react'
import styled from "styled-components";
import Title from '../atoms/Title';
import Link from "../atoms/Link";

import {SystemNav, SystemSpan, SystemComponent} from '../atoms/SystemComponents';
import theme from '../theme';
import Logo from '../atoms/Logo';
import Card from "../atoms/Card";
import Header1 from "../atoms/Header1";
import Header2 from "../atoms/Header2";
import Subtitle from "../atoms/Subtitle";
import Header3 from "../atoms/Header3";
import Body from "../atoms/Body";
import Header4 from "../atoms/Header4";

const Info = styled(SystemComponent)`
  position: relative;
  width: 50%;
  z-index: 10;
`;


const MemberSubtitle = styled(Header4)`
    fontSize: smallTitle;
    margin-bottom: ${0.5 * theme.space.cardMargin}px;
    color: ${theme.colors.greys[3]};
`

const Line = styled(SystemSpan)`
  height: inherit;
`;

const NavLink = styled(Link)`
  &:hover {
    color: ${theme.colors.theme};
  }
  &:active {
    color: ${theme.colors.theme};
  }
`;

const NavLogo = styled(Logo)`
  width: 35%;
  ${theme.mediaQueries.desktop} {
    width: auto;
  }
`;

const MemberInfo = ({navItems, index}) => {

    // Mock Data
    const memberData = {
        "name": {
            "first": "Robertson",
            "last": "Bob",
            "display": "Rob Bob"
        },
        "bio": "This is my bio.",
        "skills": [
            "MongoDB"
        ],
        "interests": [
            "Database"
        ],
        "joined": {
            "year": 2019,
            "season": "Fall"
        },
        "coopExp": [],
        "memberType": "Newbie",
        "subteam": "Software",
        "project": {
            "name": "TeamHub",
            "subteams": [
                "Software"
            ]
        },
        "email": "rob.b@waterloop.ca",
        "stream": {
            "isCoop": true,
            "onStream": true,
            "coopStream": 1,
            "currentSchoolTerm": "1A"
        },
        "age": 15,
        "birthday": {
            "month": 5,
            "day": 12
        },
        "links": [
            {
                "type": "GitHub",
                "link": "https://github.com/robobob"
            }
        ]
    };

    return (
        <Info>
            <Card display="flex" flexDirection="row">

                <SystemComponent width={"50%"} ml={3}>
                    <Header3>Member</Header3>
                    <Header2 fontSize="smallTitle">{`${memberData.name.first} ${memberData.name.last}`} </Header2>
                    <MemberSubtitle>{`Member of ${memberData.subteam} team Member of ${memberData.subteam} team Member of ${memberData.subteam} team`}</MemberSubtitle>
                    <Body>{memberData.bio}</Body>
                </SystemComponent>

                <SystemComponent width={"50%"}>
                    <Header2 fontSize="smallTitle">{`${memberData.name.first} ${memberData.name.last}`} </Header2>
                    <MemberSubtitle>{`Member of ${memberData.subteam} team Member of ${memberData.subteam} team Member of ${memberData.subteam} team`}</MemberSubtitle>
                    <Body>{memberData.bio}</Body>
                </SystemComponent>

            </Card>

        </Info>
    );
}

export default MemberInfo
