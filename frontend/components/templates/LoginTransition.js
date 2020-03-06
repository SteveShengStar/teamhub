import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export const LoginTransitionTypes = new Proxy({
    PRE_TRANSITION: "PRE_TRANSITION",
    POST_TRANSITION: "POST_TRANSITION",
    SHOWN: "SHOWN"
}, {
    set: () => {
        throw new Error("Can't mutate immutable type LoginTransitionTypes")
    }
})

/**
 * @param { {children: *, loginTransition: { state: "PRE_TRANSITION" | "SHOWN" | "POST_TRANSITION", hide: () => void, setRef: (ref: HTMLElement) => void }}}
 */
export default ({children, loginTransition, shouldHide}) => {
    const ref = useRef(null);
    useEffect(() => {
        loginTransition.setRef(ref);
    }, [ref])

    useEffect(() => {
        if (shouldHide) loginTransition.hide();
    }, [shouldHide])

    return (
        <Container state={loginTransition.state || LoginTransitionTypes.PRE_TRANSITION} ref={ref}>
            {children}
        </Container>
    )
}

const Container = styled.div`
    transition: all 1s ease;
    transform: translateX(100%);
`;