import styled from 'styled-components';
import { SystemComponent } from './SystemComponents';

const Header1 = styled(SystemComponent)``;
Header1.defaultProps = {
    fontFamily: 'title',
    fontSize: 'header1',
    fontWeight: 'regular',
    mt: 0,
    mb: 0
};

export default Header1;