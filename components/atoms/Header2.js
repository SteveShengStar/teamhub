import styled from "styled-components";
import { SystemHeader } from "./SystemComponents";

const Header2 = styled(SystemHeader.H2)``;
Header2.defaultProps = {
    fontFamily: "body",
    fontSize: "header2",
    my: 0
}

export default Header2;