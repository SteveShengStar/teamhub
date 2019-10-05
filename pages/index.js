import React from 'react';

import styled from "styled-components";
import {space, layout, color} from "styled-system";

const Header = styled.h1`
  ${space}
  ${layout}
  ${color}
`;

const Home = () => (
  <Header ml={5} p={2} bg="primary">
    Example 
  </Header>
)

export default Home;
