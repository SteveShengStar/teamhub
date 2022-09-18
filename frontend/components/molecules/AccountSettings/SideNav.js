import styled from 'styled-components';
import Card from '../../atoms/Card';
import Header3 from '../../atoms/Header3';
import { SystemComponent, SystemLink } from '../../atoms/SystemComponents';

const NavContainer = styled(SystemComponent)`
    box-sizing: border-box;
    display: none;

    width: 360px;
    padding-right: 25px;

    ${(props) => props.theme.mediaQueries.tablet} {
        display: block;
    }
`;

const NavButton = styled(SystemLink)`
    transition: all 0.2s ease;
    background-color: ${(props) => props.theme.colors.action};
    padding-left: ${(props) => props.theme.space[4]}px;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;

const NavItem = styled(SystemComponent)`
    height: 45px;
    display: flex;
    align-items: center;
`;

const SideNav = ({ labels, refIds }) => {
    return (
        <NavContainer>
            <Card boxSizing='border-box' display='flex' flexDirection='column'>
                {labels.map((label, i) => (
                    <NavButton key={i} href={'#' + refIds[i]}>
                        <NavItem>
                            <Header3
                                borderBottomWidth='0'
                                mb='0'
                                marginBlockStart='0'
                                marginBlockEnd='0'
                                color='#FFFFFF'
                            >
                                {label}
                            </Header3>
                        </NavItem>
                    </NavButton>
                ))}
            </Card>
        </NavContainer>
    );
};

export default SideNav;
