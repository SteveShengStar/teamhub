import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import { addMember, removeMember } from '../data/reducers/membersSlice';

import PageTemplate from '../components/templates/PageTemplate';
import { SystemComponent } from '../components/atoms/SystemComponents';
import Header3 from '../components/atoms/Header3';
import Card from '../components/atoms/Card';
import MemberListGrid from '../components/molecules/MemberListGrid';
import MemberInfoCard from '../components/molecules/MemberInfoCard';

const MemberListCard = styled(Card)`
  height: calc(100% - ${props => props.theme.space.cardMargin}px);
`;

const Home = ({ addMember, removeMember }) => {
  const [ members, setMembers ] = useState([]);
  const [ selectedMember, setSelectedMember ] = useState(undefined);
  /**
   * Refactor to use Redux later, for now, just fetch api directly here
   */
  useEffect(() => {
    fetch("/api/members").then((res) => res.json()).then(json => {
      if (json && json.success) setMembers(json.body);
    });
  }, []);

  function onSelectMember(id) {
    let member = members.find(member => member._id === id);
    if (member) setSelectedMember(member);
  }

  return (
    <PageTemplate title="Explore">
      <SystemComponent 
        overflow="hidden"
        display="grid" 
        gridTemplateRows="auto auto"
        gridTemplateColumns="auto 1fr"
        gridGap="cardMargin"
      >
        <MemberListCard width={"400px"} gridRow="1/3">
          <Header3>Members</Header3>

          <MemberListGrid members={members} onSelect={onSelectMember}/>
        </MemberListCard>
        {
          selectedMember && (
            <MemberInfoCard memberData={selectedMember}/>
          )
        }
      </SystemComponent>
    </PageTemplate>
  );
};

const mapStateToProps = (state) => {
    return {
        members: state.members
    };
};

const mapDispatchToProps = {
    addMember,
    removeMember
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
