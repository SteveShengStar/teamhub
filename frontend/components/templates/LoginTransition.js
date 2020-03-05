import React, { useEffect } from "react";
import styled from "styled-components";

export default ({children, state}) => {
    return (
        <Container state={state}>
            {children}
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    transition: all 0.5s ease;

    transform: ${props => {
        switch(props.state) {
            case state == "pre-transition":
                return "translateX(-100%)"
            case state == "shown":
                return "translateX(0)";
            case state: "post-transition";
                return "translateX(100%)";
            default:
                return "translateX(0)"
        }
    }};
`;