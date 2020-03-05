import React from 'react';
import styled from 'styled-components';
import {startCase} from 'lodash';

import Header4 from '../atoms/Header4';
import AnchorListItem from '../atoms/AccountSettings/AnchorListItem';
import BoxedListItem from '../atoms/AccountSettings/BoxedListItem';
import {SystemComponent} from '../atoms/SystemComponents';

import theme from '../theme'; // TODO: use props=>theme instead of importing

const CustomHeading = styled(Header4)`
    font-size: 16.5px;
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
                    <BoxedListItem variant={variant} 
                        mr={theme.space[5]}
                        text={label}
                    />
            }[isLink]
        }
    </>
);

const BoxedListItem_C = styled(BoxedListItem)`
    margin-right: ${theme.space[3]}px;
`;

const SettingsDivSubsection = ({type,
                                headerText, 
                                labelValues,
                                labelStyleVariants,
                                children}) => {
    //console.log(theme.colors[subteams[1]]);

    // TODO: revise this condition later
    // TODO: update the keys later
    // TODO: make sure labelValues and labelStylingVariants have same length
    let sectionBody;
    console.log(type);
    switch(type) {
        case 'normal':
            sectionBody = children;
            break;
        case 'anchorlist':
            sectionBody = labelValues.map((labelValue, i) => (
                    <ListItemWrapper key={i}
                        variant={labelStyleVariants[i]} 
                        label={startCase(labelValue)}
                        isLink={true}
                    />
                ));
            break;
        default:
            sectionBody = labelValues.map((labelValue, i) =>  (
                <ListItemWrapper key={i}
                    variant="background"
                    label={startCase(labelValue)}
                    isLink={false}
                />
            ));
    }
    console.log(type);
    
    return (
        <SystemComponent>
            {headerText &&  
                <SystemComponent mb={1}>
                    <CustomHeading>{headerText}</CustomHeading>
                </SystemComponent>
            }
            <SystemComponent>
                {sectionBody}
            </SystemComponent>
        </SystemComponent>
    );
}
export default SettingsDivSubsection;