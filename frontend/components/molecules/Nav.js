import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from '../atoms/Link';
import { SystemNav, SystemComponent } from '../atoms/SystemComponents';
import Logo from '../atoms/Logo';
import LogoutButton from './LogoutButton';
import { useRouter } from 'next/router';

const MyNav = styled(SystemNav)`
  position: fixed;
  padding-right: ${(props) => props.theme.space.cardMarginSmall}px;
  padding-top: ${(props) => props.theme.space[4]}px;
  z-index: 20;

  ${(props) => props.theme.mediaQueries.tablet} {
    right: ${(props) => props.theme.space.cardMargin}px;
    top: ${(props) => props.theme.space.cardMargin}px;
    padding: 0;
  }
`;

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
        {console.log(router.pathname)}
        {router.pathname == '/login' ? null : <LogoutButton />}
      </SystemComponent>
    </MyNav>
  );
};

export default Nav;
