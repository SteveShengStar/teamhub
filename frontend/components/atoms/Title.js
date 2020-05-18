import styled from 'styled-components';
import { SystemComponent } from './SystemComponents';

const Title = styled(SystemComponent)``;
Title.defaultProps = {
    fontFamily: 'title',
    fontSize: 'title',
    fontWeight: 'black',
    color: 'foreground',
    mt: 0,
    mb: 0
};

export default Title;