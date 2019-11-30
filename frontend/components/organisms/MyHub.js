import React from "react";
import styled from "styled-components";
import Card from "../atoms/Card";
import Subtitle from "../atoms/Subtitle";
import { PageTemplateGridLayout } from "../templates/PageTemplate";

const HubCard = styled(Card)`
    display: none;
    ${props => props.theme.mediaQueries.desktop} {
        display: block;
    }
`;

const MyHub = () => {
    return (
        <HubCard 
            width="280px" 
            height="inherit" 
            borderRadius="none"
            py="cardMargin"
        >
            <PageTemplateGridLayout>
                <Subtitle alignSelf="end">My Hub</Subtitle>
            </PageTemplateGridLayout>
        </HubCard>
    )
}

export default MyHub;