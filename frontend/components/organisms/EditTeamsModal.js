import styled from 'styled-components';
import EditSettingsModal from '../molecules/EditSettingsModal';
import {SystemComponent} from '../atoms/SystemComponents'
import InputPair from '../molecules/InputPair';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
    
`

const EditTeamsModal = ({modalVisible, title, onCloseModal}) => {
    return (
        <EditSettingsModal visible={modalVisible}
            title={title}
            onCloseModal={onCloseModal}
        >
            <SystemComponent display="grid" 
                gridTemplateColumns="repeat(2, 1fr)" 
                gridTemplateRows="repeat(4, 80px)" 
                gridColumnGap={40}
            >
                <SystemComponent gridColumn="1/2" gridRow="1/2">
                    <Header5>First Name</Header5>
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
                <SystemComponent gridColumn="2/3" gridRow="1/2">
                    <Header5>Last Name</Header5>   
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
                <SystemComponent gridColumn="1/2" gridRow="2/3">
                    <Header5>BirthDate</Header5>  
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
                <SystemComponent gridColumn="2/3" gridRow="2/3">   
                    <Header5>Email</Header5>  
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
            </SystemComponent>

        </EditSettingsModal>
    );
}
export default EditTeamsModal;