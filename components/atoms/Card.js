import styled from "styled-components";
import { SystemComponent } from "./SystemComponents";
import { space } from "styled-system";
import theme from "../theme";

const Card = styled(SystemComponent)`
    backdrop-filter: blur(13px);
    padding: ${props => props.theme.space.cardPadding}px;
    ${space}
`;

Card.defaultProps = {
    backgroundColor: "rgba(255,255,255,0.37)",
    borderRadius: "default",
    boxShadow: "default",
}

export default Card;