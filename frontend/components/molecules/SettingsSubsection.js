import React from 'react';
import {startCase} from 'lodash';

import Header4 from '../atoms/Header4';
import BoxedListItem from '../atoms/AccountSettings/BoxedListItem';
import {SystemComponent} from '../atoms/SystemComponents';


const ListItemWrapper = ({variant, label}) => (
    <SystemComponent mr={5} mb={2}>
        <BoxedListItem 
            variant={variant} 
            text={label}
        />
    </SystemComponent>
);


const SettingsSubsection = ({type,
                            headerText, 
                            labelValues,
                            children}) => {

    let sectionBody;

    switch(type) {
        case 'normal':
            sectionBody = children;
            break;
        case 'list':
        default:
            if (labelValues.length === 0) {
                sectionBody = <SystemComponent>You have no entries so far. Click Edit to add entries.</SystemComponent>
            }
            else {
                sectionBody = labelValues.map((labelValue, i) => (
                    <ListItemWrapper key={i}
                        variant="lightgrey"
                        label={startCase(labelValue)}
                    />
                ));
            }
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