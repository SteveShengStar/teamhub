import React from 'react';
import styled from 'styled-components';
import Title from '../atoms/Title';
import Link from '../atoms/Link';
import NextLink from 'next/link';
import { SystemNav, SystemSpan, SystemComponent } from '../atoms/SystemComponents';
import Logo from '../atoms/Logo';

const MyNav = styled(SystemNav)`
  background-color: transparent;
  position: absolute;
  right: ${props => props.theme.space.cardMargin}px;
  top: ${props => props.theme.space.cardMargin}px;
  z-index: 10;
`;

const Line = styled(SystemSpan)`
  height: inherit;
`;

const NavLink = styled(Link)`
  &:hover {
    color: ${props => props.theme.colors.theme};
  }
  &:active {
    color: ${props => props.theme.colors.theme};
  }
`;

const NavLogo = styled(Logo)`
  width: 35%;
  ${props => props.theme.mediaQueries.desktop} {
    width: auto;
  }
`;

const Nav = ({navItems, index}) => (
    <MyNav display="flex" flexDirection="column" alignItems="flex-end">
        <SystemComponent display="flex" justifyContent="flex-end">
            <Title 
                fontSize={['smallTitle', 'smallTitle', 'smallTitle', 'title']} 
                alignSelf="center"
                transition="default"
            >
        Team Hub
            </Title>
            <Line width={['5px','5px','5px','10px']} bg="foreground" mx={[4,4,4,6]}/>
            <NavLogo alignSelf="center" />
        </SystemComponent>
        <SystemComponent 
            display="flex" 
            flexWrap="wrap" 
            justifyContent="flex-end" 
            mt={3} 
            width={['80%', '80%', '80%', 'auto']}
        >
            {
                navItems.map(({name, link}, i) => 
                    <NextLink href={link} key={i}>
                        <NavLink 
                            fontSize={['smallNav', 'smallNav', 'smallNav', 'nav']}
                            fontWeight="bold"
                            ml={7}
                            color={i === index ? 'theme' : 'foreground'}
                            display={['none', 'block']}
                        >
                            {name}
                        </NavLink>
                    </NextLink>
                )
            }
        </SystemComponent>
    </MyNav>
);

export default Nav;
