import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import { addMember, removeMember } from '../data/reducers/membersSlice';
import PageTemplate from '../components/templates/PageTemplate';
import { SystemComponent } from '../components/atoms/SystemComponents';
import Header2 from '../components/atoms/Header2';
import Header3 from '../components/atoms/Header3';
import Header4 from '../components/atoms/Header4';
import GhostButton from "../components/atoms/GhostButton";
import Card from '../components/atoms/Card';
import MemberListGrid from '../components/molecules/MemberListGrid';
import Button from '../components/atoms/Button';
import Title from "../components/atoms/Title";
import Subtitle from '../components/atoms/Subtitle';
import Body from '../components/atoms/Body';
import Image from '../components/atoms/Image';
import Select from "../components/atoms/Select";
import Input from '../components/atoms/Input';
import MemberInfoCard from '../components/molecules/MemberInfoCard';


const MemberListCard = styled(Card)`
  height: calc(100% - ${props => props.theme.space.cardMargin}px);
`;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

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

  const [onState, setOnState] = useState(false);

  function toggle() {
    setOnState(!onState)
  }
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
        <MemberListCard width={"auto"} position="relative">
          <Header3>Members</Header3>
          <Input variant="text" placeholder="Search" width="95%" />
          <div float="right" position="absolute">
            <Button variant="borderless" onClick={toggle}>Hide Filters</Button>
            <Button variant="borderless">Show sort</Button>
          </div>
          {
            onState && <SystemComponent display="grid">
              <SystemComponent display="grid" gridTemplateColumns='auto auto auto' gridColumnGap={10}>
                <div>
                  <Header4>Program</Header4>
                  <Select options={options} />
                </div>
                <div>
                  <Header4>Subteam</Header4>
                  <Select options={options} />
                </div>
                <div>
                  <Header4>Roles</Header4>
                  <Select options={options} />
                </div>

              </SystemComponent>
              <SystemComponent display="grid" gridTemplateColumns='5fr 4fr 5fr' gridColumnGap={10}>
                <div>
                  <Header4>Year</Header4>
                  <Select options={options} />
                </div>
                <div>
                  <Header4>Skills</Header4>
                  <Select options={options} />
                </div>
                <div>
                  <Header4>Interest</Header4>
                  <Select options={options} />
                </div>
              </SystemComponent>
            </SystemComponent>
          }
          <MemberListGrid members={members} onSelect={onSelectMember} />
        </MemberListCard>
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
