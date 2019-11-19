import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { space, layout, color, typography } from 'styled-system';

import {
  addMember,
  removeMember,
  loadAllMembers,
  loadSelectedMember
} from '../data/reducers/memberSlice';

import PageTemplate from '../components/templates/PageTemplate';
import { SystemComponent } from '../components/atoms/SystemComponents';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import Header4 from '../components/atoms/Header4';

const Home = ({ members, addMember, removeMember, loadSelectedMember }) => {
  const [count, setCount] = useState(0);
  const membersList = members.members;
  const selectedMember = members.selectedMember;
  const exampleState = members.exampleState;
  return (
    <PageTemplate title="Explore">
      <SystemComponent>
        <Card width={'300px'}>
          <Header4>Example State: {exampleState.map((i) => i.id)}</Header4>
          <Button
            mr={3}
            onClick={() => {
              setCount(count + 1);
              if (count < Object.keys(membersList).length) {
                loadSelectedMember(Object.keys(membersList)[count]);
              }
              addMember({ id: count });
            }}
          >
            Add State and select next member
          </Button>
          <Button
            variant={'ghostNeutral'}
            onClick={() => removeMember(count - 1)}
          >
            Remove Latest State
          </Button>
          <Header4>Member List:</Header4>
          <ul>
            {Object.keys(membersList).map((i) => {
              return (
                <li key={membersList[i]._id}>{membersList[i].name.first}</li>
              );
            })}
          </ul>
          <Header4>SelectedMember:</Header4>
          <p>{selectedMember._id}</p>
        </Card>
      </SystemComponent>
    </PageTemplate>
  );
};

Home.getInitialProps = async ({ store }) => {
  await store.dispatch(loadAllMembers());
};

const mapStateToProps = (state) => {
  return {
    members: state.members
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
