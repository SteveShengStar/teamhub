import React from 'react';
import styled from 'styled-components';
import Header4 from '../atoms/Header4';

import { SystemComponent } from '../atoms/SystemComponents';
import MemberPreviewComponent from './MemberPreviewComponent';
import MemberGhostPreviewComponent from './MemberGhostPreviewComponent';

import { useSelector } from 'react-redux';

const terms = ["W", "S", "F"];

const MembersListHeader = (props) => {
    const {text, ...styleProps} = props;

    return (
        <SystemComponent {...styleProps}>
            <Header4>{text}</Header4>
        </SystemComponent>
    );
}

const MemberListGrid = ({members, onSelect, className, animRef, fetchedMembers, groupSelectedMembers}) => {
    const { subteams } = useSelector(state => state.membersState.filters);

    const normalizedSubteams = subteams && subteams.reduce((accum, subteam) => {
        return { ...accum, [subteam._id]: subteam }
    }, {});

    const date = new Date();
    const code = `${terms[Math.floor(date.getMonth() / 4)]}${date.getFullYear() - 2000}`

    return (
        <>
            <GhostLoader>
                <Container className={className}>
                    <MembersListHeader 
                        text="Your Team Leads"
                        mb={2} 
                        ml={0} 
                    />
                    {fetchedMembers ? (
                        <SystemComponent
                            display="grid"
                            gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                            gridAutoRows="min-content"
                            alignItems="start"
                            gridGap={4}
                        >
                        {
                            members && members.filter(member => member.memberType && (member.memberType.name === "Project Lead"))
                                .map((member, i) => 
                                <MemberPreviewComponent 
                                    key={i}
                                    name={`${member.name.display || member.name.first + " " + member.name.last}`}
                                    subteam={member.subteams && member.subteams.length > 0 && normalizedSubteams && normalizedSubteams[member.subteams[0]] || ""} 
                                    role={member.memberType ? member.memberType.name : ''}
                                    term={member.stream && member.stream.currentSchoolTerm || ""}
                                    onClick={() => onSelect(member._id)}
                                    imageUrl={member.imageUrl} 
                                    isSelected={groupSelectedMembers.includes(member._id)}
                                />
                            )
                        }
                        </SystemComponent>
                        ) : (
                        <SystemComponent        // Ghost loading overlay component
                            display="grid"
                            gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                            gridAutoRows="min-content"
                            alignItems="start"
                            gridGap={4}
                            ref={animRef}
                        >
                            {
                                [...Array(3)].map((_, i) =>
                                    <MemberGhostPreviewComponent key={i} visible={!fetchedMembers}/>
                                )
                            }
                        </SystemComponent>
                    )}

                    <MembersListHeader 
                        text="Your Teammates"
                        mb={2} 
                        ml={0} 
                        mt={4}
                    />
                    {fetchedMembers ? (
                        <SystemComponent
                            display="grid"
                            gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                            gridAutoRows="min-content"
                            alignItems="start"
                            gridGap={4}
                        >
                        {
                            members && members.filter(member => !member.memberType || member.memberType.name === "Member")
                                .map((member, i) => 
                                <MemberPreviewComponent 
                                    key={i}
                                    name={`${member.name.display || member.name.first + " " + member.name.last}`}
                                    subteam={member.subteams && member.subteams.length > 0 && normalizedSubteams && normalizedSubteams[member.subteams[0]] || ""} 
                                    role={member.memberType ? member.memberType.name : ''}
                                    term={member.stream && member.stream.currentSchoolTerm || ""}
                                    isOnStream={member.stream && member.stream.coopStream[code]}
                                    onClick={() => onSelect(member._id)}
                                    imageUrl={member.imageUrl} 
                                    isSelected={groupSelectedMembers.includes(member._id)}
                                />
                            )
                        }
                        </SystemComponent>
                        ) : (  
                        <SystemComponent    // Ghost loading overlay component
                            display="grid"
                            gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                            gridAutoRows="min-content"
                            alignItems="start"
                            gridGap={4}
                            ref={animRef}
                        >
                            {
                                [...Array(12)].map((_, i) =>
                                    <MemberGhostPreviewComponent key={i} visible={!fetchedMembers}/>
                                )
                            }
                        </SystemComponent>
                    )}
                </Container>
            </GhostLoader>
        </>
    );
};

export default MemberListGrid;

/**
 * Styled component definitions
 */
const GhostLoader = styled(SystemComponent)`
    position: relative;
    min-height: 80vh;
    ${props => props.theme.mediaQueries.tablet} {
        min-height: auto;
    }
`;

const Container = styled(SystemComponent)`
    position: relative;
    margin: 0 -${props => props.theme.space.cardPaddingSmall}px;
    padding: 10px ${props => props.theme.space.cardPaddingSmall}px 0;

    ${props => props.theme.mediaQueries.tablet} {
        margin: 0 -${props => props.theme.space.cardPadding}px;
        mask-image: linear-gradient(transparent,rgba(0,0,0,1.0) 10px,rgba(0,0,0,1.0) calc(100% - 10px),transparent);
        padding: 10px ${props => props.theme.space.cardPadding}px 0;
    }
`;