import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from '../atoms/Link';
import { SystemNav, SystemComponent } from '../atoms/SystemComponents';
import Logo from '../atoms/Logo';
import LogoutButton from './LogoutButton';
import { useRouter } from 'next/router';

const Container = styled(SystemComponent)`
    position: fixed;
    top: 0;
    right: 0;
    padding-top: 50px;
    z-index: 20;
    background-color: ${(props) => props.theme.colors.greys[0]};
    ${(props) => props.fullWidth && 'width: 100%;'}
`;

const MyNav = styled(SystemNav)`
    padding: 0 ${(props) => props.theme.space[4]}px 0 0;
`;
const NavOutterLayer = styled.div`
    z-index: 20;
    left: 0;
    right: 0;
    top: 0;
    color: 'grey';
    position: fixed;
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

    const isLoggingIn = router.pathname.startsWith('/login');

    return (
        <Container fullWidth={isLoggingIn}>
            <MyNav
                display='flex'
                flexDirection='column'
                alignItems='flex-end'
                shadow={scrolled ? 'default' : 'none'}
            >
                <SystemComponent display='flex' justifyContent='flex-end'>
                    <NavLogo alignSelf='center' />
                </SystemComponent>
                <SystemComponent
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='flex-end'
                    mt={3}
                    width={['80%', '80%', '80%', 'auto']}
                >
                    {navItems.map(({ name, link }, i) => (
                        <a href={link} key={i}>
                            <NavLink
                                fontSize={[
                                    'smallNav',
                                    'smallNav',
                                    'smallNav',
                                    'nav',
                                ]}
                                fontWeight='bold'
                                ml={7}
                                color={i === index ? 'theme' : 'foreground'}
                                display={['none', 'block']}
                            >
                                {name}
                            </NavLink>
                        </a>
                    ))}
                    {isLoggingIn ? null : <LogoutButton />}
                </SystemComponent>
            </MyNav>
        </Container>
    );
};

export default Nav;
