import React from "react";
import styled from "styled-components";

import { SystemComponent } from "../atoms/SystemComponents";
import MemberPreviewComponentTS from './MemberPreviewComponentTS';

const Container = styled(SystemComponent)`
    margin: 0 -${props => props.theme.space.cardPadding}px;
    mask-image: linear-gradient(transparent,rgba(0,0,0,1.0) 10px,rgba(0,0,0,1.0) calc(100% - 10px),transparent);
    padding: 10px ${props => props.theme.space.cardPadding}px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: ${props => (props.childCount > 2) ? "1fr 1fr": "1fr"};
    grid-auto-rows: min-content;
    grid-auto-columns: min-content;
    align-items: start;
`;


class MemberListGridTS extends React.Component {
    onSelect = (cardId) => {
        this.props.onSelect(cardId, this.props.tierId)
    }

    render(){
        const {roleCards, className} = this.props;
        return (
            <Container gridGap={4} overflowX="scroll" className={className} childCount={roleCards.length}>
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