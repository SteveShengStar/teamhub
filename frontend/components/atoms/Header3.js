import styled from 'styled-components';
import { SystemHeader } from './SystemComponents';

const Header3 = styled(SystemHeader.H3)``;
Header3.defaultProps = {
    fontFamily: 'body',
    fontSize: 'header3',
    mt: 0,
    mb: 4,
    pb: 1,
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    borderBottomColor: 'theme',
    width: 'fit-content',
};

export default Header3;
