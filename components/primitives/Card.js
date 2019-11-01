import styled from "styled-components";
import { SystemComponent } from "./SystemComponents";

const Card = styled(SystemComponent)`
    backdrop-filter: blur(13px);
`;

Card.defaultProps = {
    backgroundColor: "rgba(255,255,255,0.37)",
    borderRadius: "default",
    p: "cardPadding",
    boxShadow: "default",
}

export default Card;