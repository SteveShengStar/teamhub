import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addMember, removeMember } from '../data/reducers/membersSlice';

import PageTemplate from '../components/templates/PageTemplate';
import { SystemComponent } from '../components/atoms/SystemComponents';
import Button from '../components/atoms/Button';
import GhostButton from "../components/atoms/GhostButton";
import Card from '../components/atoms/Card';
import Header4 from '../components/atoms/Header4';
import MemberPreviewComponent from '../components/molecules/MemberPreviewComponent';

const Home = ({ members, addMember, removeMember }) => {
  const [count, setCount] = useState(0);
  return (
    <PageTemplate title="Explore">
      <SystemComponent>
        <Card width={"300px"}>
          <Header4>Members State: {members.map((i) => i.id)}</Header4>
          <Button mr={3}
              onClick={() => {
                  setCount(count + 1);
                  addMember({ id: count });
              }}
          >
              Add State
          </Button>
          <GhostButton variant={"neutral"} onClick={() => removeMember(count - 1)}>
              Remove Latest State
          </GhostButton>
          <MemberPreviewComponent name="Kevin Bai" subteam="Software" role="Member" project="Team Hub" />
        </Card>
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
