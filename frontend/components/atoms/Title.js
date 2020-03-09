import styled from 'styled-components';
import { SystemComponent } from './SystemComponents';

const Title = styled(SystemComponent)``;
Title.defaultProps = {
    fontFamily: 'title',
    fontSize: 'title',
    fontWeight: 'black',
    color: 'foreground',
    my: 0
};

export default Title;