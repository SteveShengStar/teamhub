import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

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

const MemberInfoCard = ({memberData, className, onClose}) => {
    let birthday = memberData.birthday ? new Date(2019, memberData.birthday.month, memberData.birthday.day) : new Date();
    birthday = birthday.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

    const skills = memberData.skills ? memberData.skills.map(skill => skill.name).join(' • ') : '';
    const subteam = memberData.subteam ? memberData.subteam.name : '';

    return (
        <InfoCard className={className}>
            <Header3 mb={3}>Member</Header3>
            <BorderlessButton 
                alignSelf="start"
                justifySelf="end"
                onClick={onClose}
            >
                Close
            </BorderlessButton>

            <SystemComponent>
                <Header2 fontSize="smallTitle">{memberData.name ? `${memberData.name.first} ${memberData.name.last}` : ''} </Header2>
                {
                    memberData.subteam ? (
                        <MemberSubtitle>
                            Member of <BorderlessButton variant={subteam.toLowerCase()} fontSize="inherit" fontWeight="inherit">
                                {subteam}
                            </BorderlessButton> team
                        </MemberSubtitle>
                    )
                        : <MemberSubtitle>New Member</MemberSubtitle>
                }
                <Body mb={3}>{memberData.bio || ''}</Body>
            </SystemComponent>

            <SystemComponent>
                <PersonalCard mb={3}>
                    <Image 
                        src={memberData.picture && memberData.picture.replace(/s96/, "s400") || '/static/default-headshot.png'}
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

                <Header5>Skills</Header5>
                <Body>{skills}</Body>

            </SystemComponent>
        </InfoCard>
    );
};

export default MemberInfoCard;

/**
 * Styled component definitions
 */
const InfoCard = styled(Card)`
    display: grid;
    max-width: 800px;
    grid-template-rows: auto 1fr;
    grid-template-columns: minmax(60%, auto) minmax(100px, 200px);
    grid-gap: ${props => props.theme.space[3]}px;
    justify-content: space-between;
    z-index: 10;
`;

const PersonalCard = styled(SystemComponent)`
    background-color: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.radii.default}px;
    box-shadow: ${props => props.theme.shadows.default};
    overflow: hidden;
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
