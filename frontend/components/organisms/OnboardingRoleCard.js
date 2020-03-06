import React from "react";
import styled from "styled-components";
import Card from "../atoms/Card";
import Subtitle from "../atoms/Subtitle";


export default () => {
    return (
        <FormCard>
            <Subtitle>Tell us more about yourself</Subtitle>
        </FormCard>
    )
}

const FormCard = styled(Card)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`