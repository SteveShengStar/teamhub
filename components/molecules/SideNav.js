import styled from 'styled-components';
import { SystemComponent } from '../atoms/SystemComponents';

const SideNav = styled(SystemComponent)`
    background-color: ${props => props.theme.colors.background};
    margin: ${props => props.theme.space[4]}px;
`;
export default SideNav;