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

const MemberInfoCard = ({memberData, className, onClose, animRef}) => {
    let birthday = memberData.birthday ? new Date(2019, memberData.birthday.month, memberData.birthday.day) : new Date();
    birthday = birthday.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

    const skills = memberData.skills ? memberData.skills.map(skill => skill.name).join(' • ') : '';
    const subteams = memberData.subteams ? memberData.subteams.name : '';

    return (
        <InfoCard className={className} ref={animRef}>
            <Header3 mb={3}>Member</Header3>
            <Button 
                alignSelf="start"
                justifySelf="end"
                onClick={onClose}
            >
                Close
            </Button>

            <ContentContainer>
                <LeftColumn>
                    <Header2 fontSize="smallTitle">{memberData.name ? `${memberData.name.display}` : ''} </Header2>
                    {
                        memberData.subteams ? (
                            <MemberSubtitle>
                                Member of <BorderlessButton variant={subteams && subteams.length > 0 && subteams[0].toLowerCase() || ""} fontSize="inherit" fontWeight="inherit">
                                    {subteams}
                                </BorderlessButton> team
                            </MemberSubtitle>
                        )
                            : <MemberSubtitle>New Member</MemberSubtitle>
                    }

                    <Body mb={3}>{memberData.bio || ''}</Body>
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

                    <Header5>Been on team since</Header5>
                    <Body>{memberData.joined ? `${memberData.joined.season} ${memberData.joined.year}` : ''}</Body>
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
    }
`;

const PersonalCard = styled(SystemComponent)`
    background-color: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.radii.default}px;
    box-shadow: ${props => props.theme.shadows.default};
    overflow: hidden;
    max-width: 400px;
`;

const MemberSubtitle = styled(Header4)`
    fontSize: smallTitle;
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
        overflow-y: scroll;
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