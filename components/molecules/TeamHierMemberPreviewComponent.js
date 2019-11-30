import React from "react";
import styled from "styled-components";

import { SystemComponent } from "../atoms/SystemComponents";
import Header5 from "../atoms/Header5";
import Body from "../atoms/Body";

import Image from "../atoms/Image";

const GridLayout = styled(SystemComponent)`
    display: grid;
    grid-template-rows: 18px 18px;
    width: 205px;

    grid-column-gap: ${props => props.theme.space[4]}px;
    padding: ${props => props.theme.space[3]}px;
    cursor: pointer;
    transition: ${props => props.theme.transitions.default};
    &:hover {
        transform: scale(1.02);
        background-color: white;
    }
    &:active {
        transform: scale(1);
        box-shadow: ${props => props.theme.shadows.light};
    }
`

class TeamHierMemberPreviewComponent extends React.Component{
    render(){
        const {cardId, name, roleTitle, onClick} = this.props;
        return(
            <GridLayout 
                backgroundColor="greys.0" 
                borderRadius="small" 
                boxShadow="default" 
                height={36}
                onClick={() => {
                    onClick(cardId);
                }}
                gridTemplateColumns="1fr 3fr"
            >
                <Image 
                    src="/static/default-headshot.png" 
                    height="36px"
                    borderRadius="18px"
                    overflow="visible"
                />
                <SystemComponent
                    textAlign="right"
                >
                    <Header5>{name}</Header5>
                    <Body>{roleTitle}</Body>
                </SystemComponent>
            </GridLayout>
        )
    }
}
export default TeamHierMemberPreviewComponent;