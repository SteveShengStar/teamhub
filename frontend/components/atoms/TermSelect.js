import styled from "styled-components";
import { SystemComponent } from "./SystemComponents";

const TermSelect = styled(SystemComponent)({
  border: "none",
  cursor: "pointer",
  textAlign: "center",
  color: props => props.theme.colors.foreground,
  backgroundColor: props => props.theme.colors.greys[0],
  borderRadius: 3,
  "&:hover": {
    opacity: 0.5,
    transform: "scale(1.05);"
  },
  '@media (hover: none)': {
    '&:hover': {
        opacity: 1,
        transform: "none"
    }
  },
  "&:active": {
    opacity: 0.25
  },
  transition: "all 0.2s ease",
  width: 50,
  height: 50,
  display: "grid",
  alignItems: "center"
});

export default TermSelect;
