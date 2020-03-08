import React, { useEffect, useRef, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import LoadingModal from "../atoms/LoadingModal";

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
 * @param { {children: *, loginTransition: { state: "PRE_TRANSITION" | "SHOWN" | "POST_TRANSITION", hide: (onFinish: () => void) => void}}}
 */
export default ({children, loginTransition}) => {
    const theme = useContext(ThemeContext)
    const ref = useRef(null);

    return (
        <>
            <Container state={loginTransition.state || LoginTransitionTypes.PRE_TRANSITION} ref={loginTransition.ref}>
                {children}
            </Container>
            { <LoadingModal visible={loginTransition.state == LoginTransitionTypes.POST_TRANSITION} color={theme.colors.primary}/>}
        </>
    )
}

const Container = styled.div`
    transition: all 0.5s ease;
    transform: translateX(110%);
`;