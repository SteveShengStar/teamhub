import React from 'react'
import styled from "styled-components";
import Title from '../atoms/Title';
import Link from "../atoms/Link";
import NextLink from "next/link";
import { SystemNav, SystemSpan, SystemComponent } from '../atoms/SystemComponents';
import theme from '../theme';
import Logo from '../atoms/Logo';

const MyNav = styled(SystemNav)`
  background-color: transparent;
  position: absolute;
  right: ${theme.space.cardMargin}px;
  top: ${theme.space.cardMargin}px;
  z-index: 10;
`;

const Line = styled(SystemSpan)`
  height: inherit;
  width: 10px;
`;

const NavLink = styled(Link)`
  &:hover {
    color: ${theme.colors.theme};
  }
  &:active {
    color: ${theme.colors.theme};
  }
`;

const Nav = ({navItems, index}) => (
  <MyNav display="flex" flexDirection="column" alignItems="flex-end">
    <SystemComponent display="flex">
      <Title>Team Hub</Title>
      <Line bg="foreground" mx={6}/>
      <Logo alignSelf="center"/>
    </SystemComponent>
    <SystemComponent display="flex" mt={3}>
      {
        navItems.map(({name, link}, i) => 
          <NextLink href={link} key={i}>
            <NavLink 
              fontSize="nav" 
              fontWeight="bold" 
              ml={7} 
              color={i === index ? "theme" : "foreground"}
            >
              {name}
            </NavLink>
          </NextLink>
        )
      }
    </SystemComponent>
  </MyNav>
)

export default Nav
