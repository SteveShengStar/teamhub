import styled from 'styled-components';
import ReactSelect from 'react-select';
import CSelect from 'react-select/creatable';
import { composition, themeDefaultProps } from './SystemComponents';

const Select = styled(ReactSelect)(composition);

const CreatableSelect = styled(CSelect)(composition);

Select.defaultProps = themeDefaultProps;
CreatableSelect.defaultProps = themeDefaultProps;

export default Select;

export { CreatableSelect };
