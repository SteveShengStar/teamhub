import React from 'react';
import styled from 'styled-components';
import {startCase} from 'lodash';

import Header4 from '../atoms/Header4';
import AnchorListItem from '../atoms/AccountSettings/AnchorListItem';
import BoxedListItem from '../atoms/AccountSettings/BoxedListItem';
import {SystemComponent} from '../atoms/SystemComponents';

import theme from '../theme'; // TODO: use props=>theme instead of importing

const BoxedListItem_C = styled(BoxedListItem)`
    margin-right: ${theme.space[5]}px;
    margin-bottom: ${theme.space[2]}px;
`;

const ListItemWrapper = ({variant, label, isLink}) => (
    <>
        {
            {
                true: 
                    <AnchorListItem variant={variant} 
                        mr={theme.space[5]}
                    >
                        {label}
                    </AnchorListItem>,
                false: 
                    <BoxedListItem_C variant={variant} 
                        text={label}
                    />
            }[isLink]
        }
    </>
);


const SettingsSubsection = ({type,
                                headerText, 
                                labelValues,
                                children}) => {

    // TODO: update the keys later
    let sectionBody;
    switch(type) {
        case 'normal':
            sectionBody = children;
            break;
        case 'list':
        default:
            sectionBody = labelValues.map((labelValue, i) =>  (
                <ListItemWrapper key={i}
                    variant="lightgrey"
                    label={startCase(labelValue)}
                    isLink={false}
                />
            ));
    }
    
    return (
        <SystemComponent>
            {headerText &&  
                <SystemComponent mb={1}>
                    <Header4 fontSize="16.5px">{headerText}</Header4>
                </SystemComponent>
            }
            <SystemComponent display="flex" flexWrap="wrap">
                {sectionBody}
            </SystemComponent>
        </SystemComponent>
    );
}
export default SettingsSubsection;