import styled from 'styled-components';
import { SystemHeader } from './SystemComponents';

const Header5 = styled(SystemHeader.H5)``;
Header5.defaultProps = {
    fontFamily: 'body',
    fontSize: 'header5',
    mb: 0,
    mt: 0,
};

export default Header5;
