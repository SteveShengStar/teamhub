import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import PageTemplate from '../frontend/components/templates/PageTemplate';
import { SystemComponent } from '../frontend/components/atoms/SystemComponents';
import Header3 from '../frontend/components/atoms/Header3';
import Card from '../frontend/components/atoms/Card';
import MemberFilterComponent from '../frontend/components/molecules/MemberFilterComponent';
import MemberListGrid from '../frontend/components/molecules/MemberListGrid';
import { searchMembers, lookupMember } from '../frontend/store/reducers/membersReducer';
import MemberInfoCard from '../frontend/components/organisms/MemberInfoCard';

const Home = () => {
    const dispatch = useDispatch();
    const members = useSelector(state => state.membersState.members)
    const selectedMember = useSelector(state => state.membersState.selectedMember)
    const loadedMembers = useSelector(state => state.membersState.loadedMembers)

    const onSelectMember = (id) => {
        if (loadedMembers[id]) {
            dispatch({
                type: "SET_SELECTED_MEMBER",
                payload: loadedMembers[id]
            })
            return
        }
        lookupMember(dispatch, id);
    };

    const updateSearchQuery = (input, filters) => {
        let normalized = {};
        Object.keys(filters).forEach(key => {
            if (filters[key].length > 0) normalized[key] = {
                _id: filters[key][0].value,
                name: filters[key][0].label
            };
        });
        searchMembers(dispatch, normalized)
    };

    // get filters for members list
    const filters = (data) => {
        let returnData = {};
        function map(dataKey) {
            if (data[dataKey]) return Object.keys(data[dataKey]).map(key => ({ label: data[dataKey][key].name, value: key }));
            return undefined;
        }
        returnData.skills = map('skills');
        returnData.subteam = map('subteams');
        returnData.program = map('program');
        returnData.interests = map('interests');

        return returnData;
    };

    return (
        <PageTemplate title="Explore">
            <SystemComponent
                position="relative"
                overflow="hidden"
                gridGap={["cardMarginSmall", "cardMarginSmall", "cardMargin"]}
                display={["block", "block", "grid"]}
                gridTemplateRows="auto auto"
                gridTemplateColumns="auto 1fr"
            >
                <MembersListCard
                    display="grid" gridTemplateColumns="1fr" gridTemplateRows="auto auto 1fr" gridRow={"1/3"}
                    overflowY="scroll"
                    position={["absolute", "absolute", "relative"]}
                    memberData={selectedMember}
                >
                    <Header3 style={{ transformOrigin: 'left' }}>Members</Header3>
                    <MemberFilterComponent filterOptions={filters(members)} updateSearchQuery={updateSearchQuery} />
                    <MemberListGrid members={members} onSelect={onSelectMember} />
                </MembersListCard>
                <MemberCard 
                    memberData={selectedMember} 
                    onClose={() => 
                        dispatch({
                            type: "SET_SELECTED_MEMBER",
                            payload: {}
                        })
                    }
                />
            </SystemComponent>
        </PageTemplate>
    );
};

export default Home;

const MembersListCard = styled(Card)`
    transition: transform 0.2s ease-out;
    transform: translateX(${props => Object.keys(props.memberData).length > 0 ? -120 : 0}%);
    width: calc(100vw - ${props => 2 * props.theme.space.cardMarginSmall + 2 * props.theme.space.cardPaddingSmall}px);
    //height: calc(100% - ${props => 3 * props.theme.space.cardMarginSmall}px);
    top: 0;
    bottom: 0;
    ${props => props.theme.mediaQueries.tablet} {
        height: auto;
        transform: none;
        width: 300px;
    }

    ${props => props.theme.mediaQueries.smallDesktop} {
        width: 35vw;
    }
`

const MemberCard = styled(MemberInfoCard)`
    position: absolute;
    transition: transform 0.2s ease-out;
    transform: translateX(${props => Object.keys(props.memberData).length > 0 ? 0 : 120}%);
    width: calc(100vw - ${props => 2 * props.theme.space.cardMarginSmall + 2 * props.theme.space.cardPaddingSmall}px);
    height: 100%;
    ${props => props.theme.mediaQueries.tablet} {
        width: auto;
        position: relative;
        height: auto;
    }
`;