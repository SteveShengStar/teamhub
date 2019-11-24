import styled from 'styled-components';
import { SystemSpan, SystemComponent } from './SystemComponents';

import theme from '../theme';

const CustomRadio = styled(SystemSpan)`
    height: 14px;
    width: 14px;
    background-color: #ffffff;
    border-radius: 50%;

    display: inline-block;
    margin-right: ${theme.space[4]};
    cursor: pointer;
}
`

const Radio = ({name, value}) => {

    return (
        <SystemComponent>
            <input type="radio" name={name} value={value} defaultChecked/>
            <CustomRadio className="radio-mock"><SystemSpan width="6px" height="6px" position="relative" bottom="4px" left="4px" display="inline-block" backgroundColor="#ffffff" borderRadius="4px"></SystemSpan></CustomRadio>
            <SystemSpan display="inline-block" ml={theme.space[4]}>Filter By Name</SystemSpan>
        </SystemComponent>
    )
}
export default Radio;