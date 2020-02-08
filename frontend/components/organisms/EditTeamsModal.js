import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents'
import SettingsInputPair from '../molecules/AccountSettings/SettingsInputPair';

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
            gridColumnGap={[20, 30, 40]}
            gridAutoRows='minmax(70px, auto)'
        >
            <SystemComponent>
                <Header5>First Name</Header5>
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent>
                <Header5>Last Name</Header5>   
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent>
                <Header5>BirthDate</Header5>  
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent>   
                <Header5>Email</Header5>  
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>

            <SystemComponent>
                <SettingsInputPair title="Academic Program"></SettingsInputPair>
            </SystemComponent>
        </SystemComponent>
    );
}
export default EditTeamsModal;