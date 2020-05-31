import React from "react";
import styled from "styled-components";

interface ILoginTransitionProps {
    transitionRef: React.MutableRefObject<HTMLDivElement>
}

const LoginTransition: React.FC<ILoginTransitionProps> = ({children, transitionRef}) => {
    return (
        <Container ref={transitionRef}>
            {children}
        </Container>
    )
}

export default LoginTransition

const Container = styled.div`
    transition: all 0.5s ease;
    transform: translateX(110%);
`;