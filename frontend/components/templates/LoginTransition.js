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
 * @param { {children: *, loginTransition: { state: "PRE_TRANSITION" | "SHOWN" | "POST_TRANSITION", hide: (onFinish: () => void) => void, setRef: (ref: HTMLElement) => void }}}
 */
export default ({children, loginTransition, shouldHide}) => {
    const ref = useRef(null);
    const [ finishHide, setFinishHide ] = useState(false)
    useEffect(() => {
        loginTransition.setRef(ref);
    }, [ref])
    const theme = useContext(ThemeContext)

    useEffect(() => {
        if (shouldHide) loginTransition.hide(() => setFinishHide(true));
    }, [shouldHide])

    return (
        <>
            <Container state={loginTransition.state || LoginTransitionTypes.PRE_TRANSITION} ref={ref}>
                {children}
            </Container>
            { <LoadingModal visible={finishHide && shouldHide} color={theme.colors.primary}/>}
        </>
    )
}

const Container = styled.div`
    transition: all 1s ease;
    transform: translateX(100%);
`;