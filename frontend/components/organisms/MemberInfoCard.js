import React, { useState } from 'react';
import styled from 'styled-components';

import Link from '../atoms/Link';
import { SystemComponent } from '../atoms/SystemComponents';
import Card from '../atoms/Card';
import Header2 from '../atoms/Header2';
import Header3 from '../atoms/Header3';
import Body from '../atoms/Body';
import Header4 from '../atoms/Header4';
import Header5 from '../atoms/Header5';
import Image from '../atoms/Image';
import MailIcon from '../atoms/Icons/MailIcon';
import BorderlessButton from '../atoms/BorderlessButton';
import Button from '../atoms/Button';

import {capitalize} from 'lodash';

const MemberInfoCard = ({memberData, className, onClose, animRef}) => {
    const memberSubteams = memberData.subteams && memberData.subteams.length > 0 ? memberData.subteams.map(st => st.name) : [];
    const memberProjects = memberData.projects && memberData.projects.length > 0 ? memberData.projects.map(prj => prj.name) : [];
    const subteam = memberSubteams && memberSubteams.length > 0 ? memberSubteams[0] : "";

    const terms = ["W", "F", "S"];
    const date = new Date();

    const faClassName = {
        "website": 'fa-globe',
        'linkedin': 'fa-globe', // Use fa-globe for now since Font Awesome 6 doesn't seem to have certain logos
        'github': 'fa-globe',
        'facebook': 'fa-globe'
    };

    return (
        <InfoCard className={className} ref={animRef}>
            <SystemComponent pl={[0, 0, 20]} pr={[0, 0, 20]} pt={[0, 0, 20]} pb={0} display="flex" justifyContent="space-between" gridColumn="1/-1">
                <Header3>Member</Header3>
                <Button 
                    alignSelf="start"
                    justifySelf="end"
                    onClick={onClose}
                >
                    Close
                </Button>
            </SystemComponent>

            <ContentContainer>
                <LeftColumn>
                    <Header2 fontSize="smallTitle">
                        {memberData.name ? memberData.name.first + " " + memberData.name.last : ''} 
                    </Header2>
                    {
                        memberData.subteams ? (
                            <MemberSubtitle>
                                { memberData && memberData.memberType && memberData.memberType.name || "Member" } on <BorderlessButton variant={ subteam && subteam.toLowerCase() || ""} fontSize="inherit" fontWeight="inherit">
                                    {subteam}
                                </BorderlessButton> team
                            </MemberSubtitle>
                        )
                            : <MemberSubtitle>New Member</MemberSubtitle>
                    }

                    <Body mb={5}>{memberData.bio || ''}</Body>

                    {memberSubteams && memberSubteams.length > 0 && <>
                        <Header5 mb={1}>Subteams</Header5>
                        <SubteamsContainer>
                            {
                                memberSubteams.map((subteam, i) => <Button key={i} variant={subteam.toLowerCase()}>{subteam}</Button>)
                            }
                        </SubteamsContainer>
                    </>}

                    {memberData && memberData.projects && memberData.projects.length > 0 && <>
                        <Header5 mb={1}>Projects</Header5>
                        <div css="display: flex; flex-direction: row;">
                            {
                                memberProjects && memberProjects.length > 1 && memberProjects.slice(0, -1).map((project, i) => {
                                    return (
                                        <div key={i}>
                                            <span>{project}</span> <span>{' • '}</span> 
                                        </div>
                                    );
                                })
                            }
                            {
                                memberProjects && memberProjects.length > 0 
                                && <div>{memberProjects[memberProjects.length - 1]}</div>
                            }
                        </div>
                    </>}

                    {memberData && memberData.interests && memberData.interests.length > 0 && <>
                        <Header5 mt={3} mb={1}>Interests</Header5>
                        <Body>{memberData.interests.map(interest => interest.name).join(" • ")}</Body>
                    </>}

                    {memberData && memberData.skills && memberData.skills.length > 0 && <>
                        <Header5 mt={3} mb={1}>Skills</Header5>
                        <Body>{memberData.skills.map(skill => skill.name).join(" • ")}</Body>
                    </>}
                    
                </LeftColumn>

                <RightColumn>
                    <PersonalCard mb={3}>
                        <Image 
                            src={memberData.imageUrl && memberData.imageUrl.replace(/s96/, "s400") || '/static/default-headshot.png'}
                            width={'100%'}
                        />
                        <SystemComponent display="flex" flexDirection="column" padding={3}>
                            <InlineItemRow>
                                <MailIcon />
                                <Link ml={2} target="_blank" href={memberData.email ? `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${memberData.email}` : ''}>Email</Link>
                            </InlineItemRow>
                            {
                                memberData.links && memberData.links.map(({type, link}, i) =>
                                    (link &&
                                    <SystemComponent fontSize="16px" ml={1}>
                                        <i className={`fa ${faClassName[type]}`}/>
                                        <Link href={link} key={i} mt={2} ml="4px" target="_blank">{capitalize(type)}</Link>
                                    </SystemComponent>)
                                )
                            }
                        </SystemComponent>
                    </PersonalCard>

                    {
                        memberData.program &&
                        <Header5 mt={5}>{memberData.program}</Header5>
                    }
                </RightColumn>
            </ContentContainer>
        </InfoCard>
    );
};
export default MemberInfoCard;

/**
 * Styled component definitions
 */
const InfoCard = styled(Card)`
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: minmax(60%, auto) minmax(100px, 200px);
    justify-content: space-between;
    z-index: 10;
    width: 100%;

    ${props => props.theme.mediaQueries.tablet} {
        max-width: 800px;
        width: auto;
        padding: 0;
    }
`;

const PersonalCard = styled(SystemComponent)`
    background-color: ${props => props.theme.colors.greys[0]};
    border-radius: ${props => props.theme.radii.default}px;
    box-shadow: ${props => props.theme.shadows.dark};
    overflow: hidden;
    max-width: 400px;
`;

const MemberSubtitle = styled(Header4)`
    font-size: ${props => props.theme.fontSizes.smallTitle};
    margin-bottom: ${props => 0.5 * props.theme.space.cardMargin}px;
    color: ${props => props.theme.colors.greys[3]};
`;

const InlineItemRow = styled(SystemComponent)`
    display: flex;
    align-items: center;
`;

const ContentContainer = styled.div`
    grid-column: 1/3;
    display: grid;
    grid-gap: ${props => props.theme.space[3]}px;
    height: calc(100% - ${props => props.theme.space.cardPaddingSmall * 2}px);
    mask-image: linear-gradient(transparent,rgba(0,0,0,1.0) 2px,rgba(0,0,0,1.0) calc(100% - 2px),transparent);

    ${props => props.theme.mediaQueries.tablet} {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: minmax(60%, auto) minmax(100px, 200px);
        padding: 10px 20px 20px;
    }
`

const LeftColumn = styled.div`
`
const RightColumn = styled.div`
    padding: 0 0 ${props => props.theme.space[1]}px;
    ${props => props.theme.mediaQueries.tablet} {
        padding: 0;
    }
`

const SubteamsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min-content, 100px));
    margin: 0 0 20px 0;
`
