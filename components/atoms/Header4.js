import styled from 'styled-components';
import { SystemHeader } from './SystemComponents';

const Header4 = styled(SystemHeader.H4)``;
Header4.defaultProps = {
    fontFamily: 'body',
    fontSize: 'header4',
    my: 0
};

export default Header4;