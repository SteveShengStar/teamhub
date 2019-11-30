import React, {useState} from 'react';

import { SystemComponent } from '../atoms/SystemComponents';
import NextSetButton from '../atoms/NextSetButton';
import TeamHierMemberListGrid from './TeamHierMemberListGrid';


const GridListParentContainer = ({tierId, roleCards, onSelect}) => {

    const [page, setPage] = useState(0);

    const onDeterminePage = (e) => {
        if ((page + 1) * 4 >= roleCards.length) {
            setPage(0)
        } else {
            setPage(page + 1);
        }
    }

    if (roleCards.length > 4){
        return(
        <SystemComponent position="relative">
            <TeamHierMemberListGrid 
                tierId={tierId}
                roleCards={roleCards.slice(page * 4, Math.min( (page+1) * 4, roleCards.length))}
                currentPage={page}
                onSelect={(cardId, tierId) => onSelect(cardId, tierId)}>
            </TeamHierMemberListGrid>
            <NextSetButton onSelect={onDeterminePage}></NextSetButton>
        </SystemComponent>)
    } else {
        return(
            <SystemComponent position="relative">
                <TeamHierMemberListGrid 
                    tierId={tierId}
                    roleCards={roleCards} 
                    currentPage={page}
                    onSelect={(cardId, tierId) => onSelect(cardId, tierId)}>
                </TeamHierMemberListGrid>
            </SystemComponent>
        )
    }
}
export default GridListParentContainer;
