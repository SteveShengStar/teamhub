import React from "react";
import styled from 'styled-components';
import { SystemComponent } from "../atoms/SystemComponents";
import Card from "../atoms/Card";
import Subtitle from "../atoms/Subtitle";
import { PageTemplateGridLayout } from "../templates/PageTemplate";

const HubCard = styled(Card)`
    display: none;

    ${props => props.theme.mediaQueries.desktop}{
        display: block;
    }
`

class MyHub extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', this.hideHub);
    }

    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}
export default MyHub;