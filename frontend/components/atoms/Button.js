import styled from "styled-components";
import { SystemButton } from "./SystemComponents";
import { variant, color, space } from "styled-system";

const Button = styled(SystemButton)(
  {
    border: "none",
    color: props => props.theme.colors.background,
    outline: "none",
    "&:hover": {
      opacity: 0.5,
      transform: "scale(1.05);"
    },
    "&:active": {
      opacity: 0.25
    },
    transition: "all 0.2s ease",
    cursor: "pointer"
  },
  variant({
    variants: {
      primary: {
        backgroundColor: "action"
      },
      alert: {
        backgroundColor: "alertAction"
      },
      neutral: {
        backgroundColor: "black"
      },
      software: {
        backgroundColor: "software"
      },
      mechanical: {
        backgroundColor: "mechanical"
      },
      electrical: {
        backgroundColor: "electrical"
      },
      admin: {
        backgroundColor: "admin"
      },
      exec: {
        backgroundColor: "exec"
      },
      infrastructure: {
        backgroundColor: "infrastructure"
      },
      cancel: {
        backgroundColor: "inactive"
      }
    }
  })
);

Button.defaultProps = {
  variant: "primary",
  borderRadius: "default",
  px: 4,
  py: 2
};

export default Button;
