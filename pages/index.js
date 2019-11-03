import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { space, layout, color, typography } from 'styled-system';

import { addMember, removeMember } from '../data/reducers/membersSlice';

const Header = styled.h1`
  ${space}
  ${layout}
  ${color}
  ${typography}
`;

const Home = ({ members, addMember, removeMember }) => {
    const [count, setCount] = useState(0);
    return (
        <>
            <Header
                ml={5}
                p={2}
                bg="primary"
                fontFamily="title"
                fontWeight="500"
            >
                {members.map((i) => i.id)}
            </Header>
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
        </>
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
