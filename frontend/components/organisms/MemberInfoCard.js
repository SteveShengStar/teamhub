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
import { useSelector } from 'react-redux';

const MemberInfoCard = ({memberData, className, onClose, animRef}) => {
    let birthday = memberData.birthday ? new Date(memberData.birthday.year, memberData.birthday.month + 1, memberData.birthday.day) : new Date();
    const { subteams, projects } = useSelector(state => state.membersState.filters);
    birthday = birthday.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    const skills = memberData.skills ? memberData.skills.map(skill => skill.name).join(' • ') : '';
    const memberSubteams = memberData.subteams && memberData.subteams.map(value => subteams.find(subteam => subteam._id == value));
    const memberProjects = memberData.projects && memberData.projects.map(project => {
        const value = projects.find(val => val._id == project.project );
        return {
            name: value ? value.name : "",
            descriptions: project.description
        }
    });
    const subteam = memberSubteams && memberSubteams.length > 0 && memberSubteams[0].name ? memberSubteams[0].name : "";

    const terms = ["W", "F", "S"];
    const date = new Date();
    const code = `${terms[Math.floor(date.getMonth() / 4)]}${date.getFullYear() - 2000}`

    return (
        <InfoCard className={className} ref={animRef}>
            <Header3 mb={3} ml={20} mt={20}>Member</Header3>
            <Button 
                alignSelf="start"
                justifySelf="end"
                onClick={onClose}
                gridColumn={2/3}
                mr={20}
                mt={20}
            >
                Close
            </Button>

            <ContentContainer>
                <LeftColumn>
                    <Header2 fontSize="smallTitle">
                        {memberData.name ? `${memberData.name.display || (memberData.name.first + " " + memberData.name.last)}` : ''} 
                    </Header2>
                    {
                        memberData.subteams ? (
                            <MemberSubtitle>
                                { memberData && memberData.memberType && memberData.memberType.name || "Member" } on <BorderlessButton variant={ subteam && subteam.toLowerCase() || ""} fontSize="inherit" fontWeight="inherit">
                                    { subteam}
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
                                memberSubteams.map((subteam, i) => <Button key={i} variant={subteam.name.toLowerCase()}>{subteam.name}</Button>)
                            }
                        </SubteamsContainer>
                    </>}

                    {memberData && memberData.projects && memberData.projects.length > 0 && <>
                        <Header5 mb={1}>Projects</Header5>
                        <div css="display: flex; flex-direction: column;">
                            {
                                memberProjects && memberProjects.map((project, i) => {
                                    return (
                                        <div key={i}>
                                            {project.name + ((project.descriptions && project.descriptions.length > 0) ?
                                                    " | " + project.descriptions.join(" • ") : "")
                                            }
                                        </div>
                                    )
                                })
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
                                <Link ml={2} href={memberData.email ? `mailto:${memberData.email}` : ''}>Email</Link>
                            </InlineItemRow>
                            {
                                memberData.links && memberData.links.map(({type, link}, i) =>
                                    <Link href={link} key={i} mt={2}>{type}</Link>
                                )
                            }
                            <Body>{`🎂 ${birthday}`}</Body>
                        </SystemComponent>
                    </PersonalCard>

                    {
                        memberData.stream && memberData.stream.currentSchoolTerm && memberData.program &&
                            <>
                                <Header5 mt={5}>{memberData.stream.currentSchoolTerm + " " + memberData.program}</Header5>
                                <InlineItemRow>
                                    <Dot isOnStream={memberData.stream.coopStream[code]}/>
                                    <Body as="div">{memberData.stream.coopStream[code] ? "Onstream" : "Offstream"}</Body>
                                </InlineItemRow>
                            </>
                    }
                    <Header5 mt={2} mb={1}>Been on team since</Header5>
                    <Body mb={5}>{memberData.joined ? `${memberData.joined.season} ${memberData.joined.year}` : ''}</Body>
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
    color: ${props => props.theme.colors.grays[3]};
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

const Dot = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 8px;
    margin: 0 3px 0 0;
    background-color: ${props => props.isOnStream ? "#32E67E" : props.theme.colors.theme};
`
