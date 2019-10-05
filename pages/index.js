import React from 'react';

import styled from "styled-components";
import {space, layout, color, typography} from "styled-system";

const Header = styled.h1`
  ${space}
  ${layout}
  ${color}
  ${typography}
`;

const Home = () => (
  <Header ml={5} p={2} bg="primary" fontFamily="title" fontWeight="500">
    Example 
  </Header>
)

export default Home;
