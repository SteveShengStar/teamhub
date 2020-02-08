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

const EditProfileModal = () => {
    return (
        <>
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
                <SystemComponent>
                    <SettingsInputPair title="School Term"></SettingsInputPair>
                </SystemComponent>
                <SystemComponent>
                    <SettingsInputPair title="Work/Study Sequence"></SettingsInputPair>
                </SystemComponent>
            </SystemComponent>

            <SystemComponent height={70}>
                <Header5>Skills</Header5>  
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            <SystemComponent height={70}>
                <Header5>Interests</Header5>  
                <CustomInput variant="text" placeholder="Search" value={"Filler"} />
            </SystemComponent>
            
        </>
    );
}
// TODO: for skills section, allow suggestions to pop up.
export default EditProfileModal;