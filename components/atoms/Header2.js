import styled from "styled-components";
import { SystemHeader } from "./SystemComponents";

const Header2 = styled(SystemHeader.H2)``;
Header2.defaultProps = {
    fontFamily: "body",
    fontSize: "header2",
    my: 0,
    pb: 1,
    borderBottomStyle: "solid",
    borderBottomWidth: "2px",
    borderBottomColor: "theme"
}

export default Header2;