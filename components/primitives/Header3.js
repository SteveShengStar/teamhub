import styled from "styled-components";
import { SystemHeader } from "./SystemComponents";

const Header3 = styled(SystemHeader.H3)``;
Header3.defaultProps = {
    fontFamily: "body",
    fontSize: "header3",
    my: 0
}

export default Header3;