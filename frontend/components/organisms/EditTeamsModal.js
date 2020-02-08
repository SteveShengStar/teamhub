import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';
import TextArea from '../atoms/TextArea';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

const EditTeamsModal = () => {
    return (
        <>
            <SystemComponent display="grid" 
                gridTemplateColumns={"100%"}
                gridAutoRows='minmax(70px, auto)'
            >
                <SystemComponent>
                    <Header5>Which Subteams are you in ?</Header5>
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
                <SystemComponent>
                    <Header5>What Projects are you Working on ?</Header5>   
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
                <SystemComponent>
                    <Header5>What do you do on Waterloop ?</Header5>  
                    <TextArea variant="default"/>
                </SystemComponent>
            </SystemComponent>            
        </>
    );
}
export default EditTeamsModal;