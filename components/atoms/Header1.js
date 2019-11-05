import styled from "styled-components";
import { SystemComponent } from "./SystemComponents";

const Header1 = styled(SystemComponent)``;
Header1.defaultProps = {
    fontFamily: "title",
    fontSize: "header1",
    fontWeight: "regular",
    my: 0
}

export default Header1;