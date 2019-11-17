import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import { addMember, removeMember } from '../data/reducers/membersSlice';
import PageTemplate from '../components/templates/PageTemplate';
import { SystemComponent } from '../components/atoms/SystemComponents';
import Header3 from '../components/atoms/Header3';
import Card from '../components/atoms/Card';
import MemberFilterComponent from "../components/molecules/MemberFilterComponent";
import MemberListGrid from '../components/molecules/MemberListGrid';
import MemberInfoCard from '../components/molecules/MemberInfoCard';

const Home = ({ addMember, removeMember }) => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(undefined);

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
  // end of methods to be replaced by redux

  return (
    <PageTemplate title="Explore">
      <SystemComponent
        overflow="hidden"
        display="grid"
        gridTemplateRows="auto auto"
        gridTemplateColumns="auto 1fr"
        gridGap="cardMargin"
      >
        <Card 
          width={"auto"} minWidth={[300, 300, 300, "35vw"]} maxWidth={400, 400, 400, "35vw"} gridRow="1/3" 
          display="grid" gridTemplateColumns="1fr" gridTemplateRows="auto auto 1fr"
          overflow="scroll"
        >
          <Header3>Members</Header3>
          <MemberFilterComponent />
          <MemberListGrid members={members} onSelect={onSelectMember} />
        </Card>
        {
          selectedMember && (
            <MemberInfoCard memberData={selectedMember} />
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
