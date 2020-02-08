import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents'
import InputPair from '../molecules/InputPair';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
    
`;

const EditTeamsModal = () => {
    return (
        <SystemComponent display="grid" 
            gridTemplateColumns={["100%", "repeat(2, 1fr)"]}
            gridTemplateRows={["repeat(4, 70px)", "repeat(2, 70px)"]}
            gridColumnGap={[20, 30, 40]}
        >
            <SystemComponent gridColumn="1 span 1" gridRow="1 span 1">
                <Header5>First Name</Header5>
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent gridColumn="1 span 1" gridRow="1 span 1">
                <Header5>Last Name</Header5>   
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent gridColumn="1 span 1" gridRow="1 span 1">
                <Header5>BirthDate</Header5>  
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent gridColumn="1 span 1" gridRow="1 span 1">   
                <Header5>Email</Header5>  
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
        </SystemComponent>
    );
}
export default EditTeamsModal;