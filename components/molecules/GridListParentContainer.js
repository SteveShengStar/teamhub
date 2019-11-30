import React from 'react';

import { SystemComponent } from '../atoms/SystemComponents';
import NextSetButton from '../atoms/NextSetButton';
import TeamHierMemberListGrid from './TeamHierMemberListGrid';


class GridListParentContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: 0
        }
    }

    onDeterminePage = (e) => {
        if ((this.state.page+1) * 4 >= this.props.roleCards.length) {
            this.setState({page: 0})
        } else {
            this.setState({page: this.state.page + 1})
        }
    }

    render() {
        const {tierId, roleCards, onSelect} = this.props;
        
        if (roleCards.length > 4){
            return(
            <SystemComponent position="relative">
                <TeamHierMemberListGrid 
                    tierId={tierId}
                    roleCards={roleCards.slice(this.state.page * 4, Math.min( (this.state.page+1) * 4, roleCards.length))}
                    currentPage={this.state.page}
                    onSelect={(cardId, tierId) => onSelect(cardId, tierId)}>
                </TeamHierMemberListGrid>
                <NextSetButton onSelect={this.onDeterminePage}></NextSetButton>
            </SystemComponent>)
        } else {
            return(
                <SystemComponent position="relative">
                    <TeamHierMemberListGrid 
                        tierId={tierId}
                        roleCards={roleCards} 
                        currentPage={this.state.page}
                        onSelect={(cardId, tierId) => onSelect(cardId, tierId)}>
                    </TeamHierMemberListGrid>
                </SystemComponent>
            )
        }
    }
}
export default GridListParentContainer;
