import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import { addMember, removeMember } from '../data/reducers/membersSlice';

import PageTemplate from '../components/templates/PageTemplate';
import { SystemComponent } from '../components/atoms/SystemComponents';
import Header3 from '../components/atoms/Header3';
import GhostButton from "../components/atoms/GhostButton";
import Card from '../components/atoms/Card';
import Header4 from '../components/atoms/Header4';
import MemberListGrid from '../components/molecules/MemberListGrid';

const MemberListCard = styled(Card)`
  height: calc(100% - ${props => props.theme.space.cardMargin}px);
`;

const Home = ({ addMember, removeMember }) => {
  const [ members, setMembers ] = useState([]);
  /**
   * Refactor to use Redux later, for now, just fetch api directly here
   */

  useEffect(() => {
    fetch("/api/members").then((res) => res.json()).then(json => {
      if (json && json.success) setMembers(json.body);
    });
  }, []);

  return (
    <PageTemplate title="Explore">
      <SystemComponent overflow="hidden">
        <MemberListCard width={"400px"}>
          <Header3>Members</Header3>
          <MemberListGrid members={members}/>
        </MemberListCard>
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
