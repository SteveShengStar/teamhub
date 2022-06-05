import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from '../atoms/Link';
import { SystemNav, SystemComponent } from '../atoms/SystemComponents';
import Logo from '../atoms/Logo';
import LogoutButton from './LogoutButton';
import { useRouter } from 'next/router';

const MyNav = styled(SystemNav)`
  padding-right: ${(props) => props.theme.space[9]}px;
  padding-top: ${(props) => props.theme.space[8]}px;
  padding-bottom: ${(props) => props.theme.space[7]}px;

  ${(props) => props.theme.mediaQueries.tablet} {
    right: 40px;
    top: 10px;
    left: 40px;
  }
`;
const NavOutterLayer = styled.div`
  z-index: 20;
  left: 0;
  right: 0;
  top: 0;
  color: "grey";
  position: fixed;
`

const NavLink = styled(Link)`
  &:hover {
    color: ${(props) => props.theme.colors.theme};
  }
  &:active {
    color: ${(props) => props.theme.colors.theme};
  }
`;

const NavLogo = styled(Logo)`
  width: 80%;
  ${(props) => props.theme.mediaQueries.mobile} {
    width: 70%;
  }
  ${(props) => props.theme.mediaQueries.tablet} {
    width: 50%;
  }
`;

const Nav = ({ navItems, index }) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  function updateNavStyle() {
    if (window.pageYOffset > 0 && !scrolled) setScrolled(true);
    if (window.pageYOffset <= 0 && scrolled) setScrolled(false);
  }
  useEffect(() => {
    window.addEventListener('scroll', updateNavStyle);
    return () => window.removeEventListener('scroll', updateNavStyle);
  });

  return (
    <NavOutterLayer>
      <MyNav
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        bg="greys.0"
        shadow={scrolled ? 'default' : 'none'}
      >
        <SystemComponent display="flex" justifyContent="flex-end">
          <NavLogo alignSelf="center" />
        </SystemComponent>
        <SystemComponent
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-end"
          mt={3}
          width={['80%', '80%', '80%', 'auto']}
        >
          {navItems.map(({ name, link }, i) => (
            <a href={link} key={i}>
              <NavLink
                fontSize={['smallNav', 'smallNav', 'smallNav', 'nav']}
                fontWeight="bold"
                ml={7}
                color={i === index ? 'theme' : 'foreground'}
                display={['none', 'block']}
              >
                {name}
              </NavLink>
            </a>
          ))}
          {router.pathname.startsWith('/login') ? null : <LogoutButton />}
        </SystemComponent>
      </MyNav>
    </NavOutterLayer>
    
    
  );
};

export default Nav;
