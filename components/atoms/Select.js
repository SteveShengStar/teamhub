import styled from "styled-components";
import ReactSelect from "react-select";
import { composition, themeDefaultProps } from "./SystemComponents";

const Select = styled(ReactSelect)(
    composition
)

Select.defaultProps = themeDefaultProps;

export default Select;