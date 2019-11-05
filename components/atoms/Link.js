import styled from "styled-components";
import { SystemLink } from "./SystemComponents";

const Link = styled(SystemLink)(
    {
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
        opacity: 1.0,
        "&:hover": {
            opacity: 0.5
        },
        "&:active": {
            opacity: 0.25
        }
    }
)
export default Link;