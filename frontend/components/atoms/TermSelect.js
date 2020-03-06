import styled from "styled-components";
import { SystemButton } from "./SystemComponents";
import {
  variant,
  color,
  space,
  height,
  width,
  marginRight,
  padding
} from "styled-system";
import Button from "./Button";

const TermSelect = styled(SystemButton)({
  border: "none",
  color: props => props.theme.colors.foreground,
  outline: "none",
  "&:hover": {
    opacity: 0.5,
    transform: "scale(1.05);"
  },
  "&:active": {
    opacity: 0.25
  },
  transition: "all 0.2s ease",
  cursor: "pointer",
  marginRight: "10px",
  padding: "8px"
});
export default TermSelect;
