import styled from 'styled-components';
import { SystemComponent } from './SystemComponents';

const Subtitle = styled(SystemComponent)``;
Subtitle.defaultProps = {
    fontFamily: 'title',
    fontSize: 'subtitle',
    fontWeight: 'regular',
    mt: 0,
    mb: 0
};

export default Subtitle;