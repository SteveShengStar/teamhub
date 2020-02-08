import {useState} from 'react';
import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';
import TextArea from '../atoms/TextArea';

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import ToggleListItem from '../atoms/ToggleListItem';

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

const subteams = ["Software", "Electrical", "Mechanical", "Executive", "Infrastructure", "Admin"]
const themeVariantLabels = ["software", "electrical", "mechanical", "exec", "infrastructure", "admin"]

const EditTeamsModal = () => {
    // TODO: Think about where this state should live
    const [ selected, setModalVisible ] = useState(false);

    return (
        <>
            <SystemComponent display="grid" 
                gridTemplateColumns={"100%"}
                gridAutoRows='minmax(70px, auto)'
            >
                <SystemComponent>
                    <Header5>Which Subteams are you in ?</Header5>
                    {subteams.map((subteam, i) => 
                        <SystemComponent mb={3}>
                            <ToggleListItem variant={themeVariantLabels[i]}>
                                {subteam}
                            </ToggleListItem>
                        </SystemComponent>
                    )}
                </SystemComponent>
                <SystemComponent>
                    <Header5>What Projects are you Working on ?</Header5>   
                    <CustomInput variant="text" placeholder="Search" value={"Filler"} />
                </SystemComponent>
                <SystemComponent>
                    <Header5>What do you do on Waterloop ?</Header5>  
                    <TextArea/>
                </SystemComponent>
            </SystemComponent>            
        </>
    );
}
export default EditTeamsModal;