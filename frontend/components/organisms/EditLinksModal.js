import {useState} from 'react';
import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

const EditLinksModal = () => {
    return (
        <SystemComponent display="grid" 
            gridTemplateColumns={["100%", "repeat(2, 1fr)"]}
            gridColumnGap={[20, 30, 40]}
            gridAutoRows='minmax(70px, auto)'
        >
            <SystemComponent>
                <Header5>Personal Website</Header5>
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent>
                <Header5>Github</Header5>   
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent>
                <Header5>LinkedIn</Header5>  
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent>   
                <Header5>Facebook</Header5>  
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
        </SystemComponent>
    )
}
export default EditLinksModal;
