import React from 'react';
import styled from 'styled-components';
import Header2 from '../atoms/Header2';
import Header3 from '../atoms/Header3';
import Body from '../atoms/Body';
import Header4 from '../atoms/Header4';
import Header5 from '../atoms/Header5';

import { SystemComponent } from '../atoms/SystemComponents';
import MemberPreviewComponent from './MemberPreviewComponent';
import MemberGhostPreviewComponent from './MemberGhostPreviewComponent';

import { useSelector } from 'react-redux';

const terms = ["W", "S", "F"]

const MemberListGrid = ({memberData, members, onSelect, className, animRef, fetchedMembers}) => {
    const { subteams } = useSelector(state => state.membersState.filters);
    const memberSubteams = memberData.subteams && memberData.subteams.map(value => subteams.find(subteam => subteam._id == value));
    console.log("Member Subteams: ", memberSubteams);
    console.log("Member Data: ", memberData);
    const normalizedSubteams = subteams && subteams.reduce((accum, subteam) => {
        return { ...accum, [subteam._id]: subteam }
    }, {})

    const date = new Date();
    const code = `${terms[Math.floor(date.getMonth() / 4)]}${date.getFullYear() - 2000}`
    return (
        <>
            <GhostLoader>
                <Container gridGap={4} overflowY={["auto", "auto", "scroll"]} className={className}>
                    {
                        [...Array(50)].map((_, i) =>
                            <MemberGhostPreviewComponent key={i} visible={!fetchedMembers}/>
                        )
                    }
                </Container>

                <Container gridGap={4} overflowY={["auto", "auto", "scroll"]} className={className} ref={animRef}>

                <Header4 mb={3} ml={20} mt={20}>
                        Team Leads - {memberSubteams == null ? "" : memberSubteams.name}
                </Header4>
                
                    {
                        members && members.map((member, i) => 
                        // (
                        //     member.subteams == memberSubteams ? (                If current member belongs to selected member's subteam

                                //TODO: Replace hardcoded subteam lead with logged in user's role
                                // member.memberType == "Subteam Lead" ? (          If the current member is a LEADER
                                    <MemberPreviewComponent 
                                        key={i}
                                        name={`${member.name.display || member.name.first + " " + member.name.last}`}
                                        subteam={member.subteams && member.subteams.length > 0 && normalizedSubteams && normalizedSubteams[member.subteams[0]] || ""} 
                                        role={member.memberType ? member.memberType.name : ''}
                                        term={member.stream && member.stream.currentSchoolTerm || ""}
                                        isOnStream={member.stream && member.stream.coopStream[code]}
                                        onClick={() => onSelect(member._id)}
                                        imageUrl={member.imageUrl} 
                                    />
                                //  ):  null

                        //      ): null
                            
                        )
                    }

                    <br/><br/>

                    <Header4 mb={3} ml={20} mt={20}>
                        Team Members -
                    </Header4>
                
                    {
                        members && members.map((member, i) => 
                        // (
                        //     member.subteams == memberSubteams ? (                If current member belongs to selected member's subteam

                                //TODO: Replace hardcode Member role with logged in user's role
                                // member.memberType == "Member" ? (          If the current member is a MEMBER
                                    <MemberPreviewComponent 
                                        key={i}
                                        name={`${member.name.display || member.name.first + " " + member.name.last}`}
                                        subteam={member.subteams && member.subteams.length > 0 && normalizedSubteams && normalizedSubteams[member.subteams[0]] || ""} 
                                        role={member.memberType ? member.memberType.name : ''}
                                        term={member.stream && member.stream.currentSchoolTerm || ""}
                                        isOnStream={member.stream && member.stream.coopStream[code]}
                                        onClick={() => onSelect(member._id)}
                                        imageUrl={member.imageUrl} 
                                    />
                                //  ):  null

                        //      ): null
                            
                        )
                    }


                    <SystemComponent height="10px" />
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
`

const Container = styled(SystemComponent)`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0 -${props => props.theme.space.cardPaddingSmall}px;
    padding: 10px ${props => props.theme.space.cardPaddingSmall}px 0;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: min-content;
    align-items: start;

    ${props => props.theme.mediaQueries.tablet} {
        margin: 0 -${props => props.theme.space.cardPadding}px;
        mask-image: linear-gradient(transparent,rgba(0,0,0,1.0) 10px,rgba(0,0,0,1.0) calc(100% - 10px),transparent);
        padding: 10px ${props => props.theme.space.cardPadding}px 0;
    }
`;