import styled from "styled-components";
import { SystemButton } from "./SystemComponents";
import { variant } from "styled-system";

const Button = styled(SystemButton)(
    {
        border: "none",
        outline: "none",
        "&:hover": {
            opacity: 0.5,
            transform: `scale(1.05);`
        },
        "&:active": {
            opacity: 0.25
        },
        transition: "all 0.2s ease",
        cursor: "pointer",
    },
    variant({
        variants: {
            primary: {
                color: "background",
                backgroundColor: "action",
            },
            primaryAlert: {
                color: "background",
                backgroundColor: "alertAction"
            },
            primaryNeutral: {
                color: "background",
                backgroundColor: "black"
            },
            ghost: {
                color: "action",
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "action"
            },
            ghostAlert: {
                color: "alertAction",
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "alertAction"
            },
            ghostNeutral: {
                color: "black",
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "black"
            },
            borderless: {
                backgroundColor: "transparent",
                padding: 0,
                color: "action"
            }
        }
    }),
);

Button.defaultProps = {
    variant: "primary",
    borderRadius: "default",
    px: 4,
    py: 2,
}

export default Button;