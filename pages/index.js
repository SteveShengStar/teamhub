import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  addMember,
  removeMember,
  loadAllMembers,
  loadSelectedMember
} from '../data/reducers/memberSlice';

import PageTemplate from '../components/templates/PageTemplate';
import { SystemComponent } from '../components/atoms/SystemComponents';
import Header3 from '../components/atoms/Header3';
import Card from '../components/atoms/Card';
import MemberFilterComponent from "../components/molecules/MemberFilterComponent";
import MemberListGrid from '../components/molecules/MemberListGrid';
import MemberInfoCard from '../components/organisms/MemberInfoCard';

const Home = ({ members, loadSelectedMember, selectedMember }) => {

  function onSelectMember(id) {
    loadSelectedMember(id);
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
        <Card 
          width={"auto"} minWidth={[300, 300, 300, "30vw"]} maxWidth={400, 400, 400, "30vw"} gridRow="1/3" 
          display="grid" gridTemplateColumns="1fr" gridTemplateRows="auto auto 1fr"
          overflow="scroll"
        >
          <Header3>Members</Header3>
          <MemberFilterComponent />
          <MemberListGrid members={members.members} onSelect={onSelectMember} />
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

Home.getInitialProps = async ({ store }) => {
  await store.dispatch(loadAllMembers(true));
};

const mapStateToProps = (state) => {
  return {
    members: state.members,
    selectedMember: state.members.selectedMember
  };
};

const mapDispatchToProps = {
  addMember,
  removeMember,
  loadSelectedMember
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
