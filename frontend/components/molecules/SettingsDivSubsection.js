import React from 'react';
import styled from 'styled-components';
import {startCase} from 'lodash';

import Header4 from '../atoms/Header4';
import AnchorListItem from '../atoms/AccountSettings/AnchorListItem';
import {SystemComponent} from '../atoms/SystemComponents';

import theme from '../theme'; // TODO: use props=>theme instead of importing

const CustomHeading = styled(Header4)`
    font-size: 16.5px;
`;

const ListItemWrapper = ({variant, label}) => {
    return (
        <AnchorListItem variant={variant} 
            mr={theme.space[5]}
        >
            {label}
        </AnchorListItem>
    );
};

const SettingsDivSubsection = ({
                                headerText, 
                                isLabelListSection = false,
                                labelValues,
                                labelStyleVariants,
                                children}) => {
    //console.log(theme.colors[subteams[1]]);

    // TODO: revise this condition later
    // TODO: update the keys later
    // TODO: make sure labelValues and labelStylingVariants have same length
    let sectionBody;
    if (isLabelListSection) {
        sectionBody = labelValues.map((labelValue, i) => 
            <ListItemWrapper key={i}
                variant={labelStyleVariants[i]} 
                label={startCase(labelValue)}
            />
        );
    } else {
        sectionBody = children;
    }
    
    return (
        <>
            {headerText &&  
                <SystemComponent height={30}>
                    <CustomHeading>{headerText}</CustomHeading>
                </SystemComponent>
            }
            <SystemComponent>
                {sectionBody}
            </SystemComponent>
        </>
    );
}
export default SettingsDivSubsection;