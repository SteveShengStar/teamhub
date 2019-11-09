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
import Image from "../atoms/Image";
import Header5 from "../atoms/Header5";

const InfoCard = styled(Card)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between; 
    
    position: relative;
    width: 50%;
    z-index: 10;
`;


const Member = styled(Header3)`
    margin-bottom: 10px;
`

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
        "bio": "This is my Bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
        "skills": [
            "MongoDB", "Python", "CSS"
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
        // TODO: Add a year field
        "birthday": {
            "month": 5,
            "day": 12
        },
        "links": [
            {
                "type": "GitHub",
                "link": "https://github.com/robobob"
            },
            {
                "type": "Resume",
                "link": "www.example.com"
            }
        ]
    };

    let birthday = new Date(2019, memberData.birthday.month, memberData.birthday.day);
    birthday = birthday.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});

    const skills = memberData.skills.join(" • ");

    return (
        <InfoCard>

                <SystemComponent width={"50%"}>
                    <Member>Member</Member>
                    <Header2 fontSize="smallTitle">{`${memberData.name.first} ${memberData.name.last}`} </Header2>
                    <MemberSubtitle>Member of <font color={theme.colors.software}>{memberData.subteam}</font> team</MemberSubtitle>
                    <Body>{memberData.bio}</Body>
                </SystemComponent>

                <SystemComponent width={"40%"}>
                    <Card mb={3}>
                        <Link href={`mailto:${memberData.email}`}>Email</Link>
                        {
                            memberData.links.map(({type, link}, i) =>
                                <Link href={link} key={i}><p>{type}</p></Link>
                            )
                        }
                        <Body>{`🎂 ${birthday}`}</Body>
                    </Card>

                    <Header5>Skills</Header5>
                    <Body>{skills}</Body>

                </SystemComponent>

        </InfoCard>
    );
}

export default MemberInfo
