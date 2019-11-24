import React from "react";
import styled from "styled-components";
import theme from "../theme";

import { SystemComponent } from "../atoms/SystemComponents";
import MemberPreviewComponentTS from './MemberPreviewComponentTS';


const tempGridGap = (theme.space[4] + theme.space[3]*2 + 205)*2;
const Container = styled(SystemComponent)`
    margin: 0 -${props => props.theme.space.cardPadding}px;
    padding: ${props => props.theme.space[1]}px ${props => props.theme.space.cardPadding}px 0;
    display: inline-grid;
    grid-template-columns: repeat(${props => (props.childCount <= 4) ? '2' : ((props.childCount + 1) / 2).toString(10)}, 1fr);
    grid-template-rows: ${props => (props.childCount > 2) ? 'repeat(2, 1fr)' : "1fr"};
    grid-auto-rows: min-content;
    grid-auto-columns: min-content;
    grid-auto-flow: column;
    align-items: start;

    position: relative;
    right: ${props => props.currentPage * tempGridGap}px;
`;

class MemberListGridTS extends React.Component {
    onSelect = (cardId) => {
        this.props.onSelect(cardId, this.props.tierId)
    }

    render(){
        const {roleCards, className, currentPage} = this.props;
        return (
            <Container gridGap={4} overflow="hidden" className={className} childCount={roleCards.length} currentPage={currentPage}>
                {
                    roleCards && roleCards.map(roleCard => 
                        <MemberPreviewComponentTS key={roleCard._id}
                            cardId={roleCard._id}
                            name={`${roleCard.leader.name.first} ${roleCard.leader.name.last}`}
                            roleTitle={roleCard.name ? roleCard.name : ""} 
                            onClick={this.onSelect}
                        />
                    )
                }
                <SystemComponent height="10px" />
            </Container>
        )
    }
}
export default MemberListGridTS;