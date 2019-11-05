import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { space, layout, color, typography } from 'styled-system';
import { addMember, removeMember } from '../data/reducers/membersSlice';

import PageTemplate from '../components/templates/PageTemplate';
import { SystemComponent } from '../components/atoms/SystemComponents';

const Home = ({ members, addMember, removeMember }) => {
  const [count, setCount] = useState(0);
  return (
    <PageTemplate title="Explore">
      <SystemComponent>
        {members.map((i) => i.id)}
        <button
            onClick={() => {
                setCount(count + 1);
                addMember({ id: count });
            }}
        >
            Add State
        </button>
        <button onClick={() => removeMember(count - 1)}>
            Remove Latest State
        </button>
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
