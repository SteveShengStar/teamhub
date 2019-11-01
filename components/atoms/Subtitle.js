import styled from "styled-components";
import { SystemComponent } from "./SystemComponents";

const Subtitle = styled(SystemComponent)``;
Subtitle.defaultProps = {
    fontFamily: "title",
    fontSize: "subtitle",
    fontWeight: "regular",
    my: 0
}

export default Subtitle;