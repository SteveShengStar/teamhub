import React from "react";
import styled from "styled-components";

/**
 * @param { {children: *, loginTransition: { state: "PRE_TRANSITION" | "SHOWN" | "POST_TRANSITION", hide: (onFinish: () => void) => void}}}
 */
const LoginTransition = ({children, transitionRef}) => {

    return (
        <Container ref={transitionRef}>
            {children}
        </Container>
    )
}
export default LoginTransition;

const Container = styled.div`
    transition: all 0.5s ease;
    transform: translateX(110%);
`;