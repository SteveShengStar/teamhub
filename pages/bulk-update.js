import { useState, useContext } from "react";
import { useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';

import PageTemplate from "../frontend/components/templates/PageTemplate";
import { SystemComponent } from "../frontend/components/atoms/SystemComponents";

import Header4 from "../frontend/components/atoms/Header4";
import Input from "../frontend/components/atoms/Input";
import Button from "../frontend/components/atoms/Button";


const Update = () => {
    const theme = useContext(ThemeContext);
    const { token } = useSelector(state => state.userState); 

    const [file, setFile] = useState(undefined);
    const [errorMsgVisible, setErrorMsgVisible] = useState(false);
    const [successMsgVisible, setSuccessMsgVisible] = useState(false);
    const [failMsgVisible, setFailMsgVisible] = useState(false);
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (errorMsgVisible) setErrorMsgVisible(false);
        if (successMsgVisible) setSuccessMsgVisible(false);
        if (failMsgVisible) setFailMsgVisible(false);

        if (file && file.name.substring(file.name.length - 4) === ".csv") {
            const formData = new FormData();
            formData.append('file', file);

            fetch("http://localhost:3000/api/upload", {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    //"Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
            .then(res => {
                setSuccessMsgVisible(true);
                console.log("Successfully updated the data on the back end.")
            })
            .catch(err => {
                setFailMsgVisible(true);
                console.error("Error: the update operation failed. Please check the format of your uploaded file, then try again.")
            })
        } else {
            if (!errorMsgVisible) setErrorMsgVisible(true);
        }
    }

    return (
        <PageTemplate title="Upload">
            <SystemComponent
                position="relative"
                overflowY="hidden"
                overflowX="hidden"
                gridGap={["cardMarginSmall", "cardMarginSmall", "cardMarginSmall", "cardMargin"]}
                display={["block", "block", "grid", "grid"]}
                gridTemplateRows="auto auto"
                gridTemplateColumns="auto 1fr"
            >
                <SystemComponent>
                    <SystemComponent mb={4}>
                        <Header4>
                            Please Upload the Roster CSV File.
                        </Header4>
                        <SystemComponent>
                            <Input type="file" onChange={e => {
                                setFile(e.target.files[0]);
                                if (errorMsgVisible) setErrorMsgVisible(false);
                                if (successMsgVisible) setSuccessMsgVisible(false);
                                if (failMsgVisible) setFailMsgVisible(false);
                            }}/>
                        </SystemComponent>
                        <SystemComponent color={theme.colors.alertAction} style={{visibility: `${errorMsgVisible ? `visible` : `hidden`}`}} >
                            Please ensure the file is in CSV format.
                        </SystemComponent>
                        <SystemComponent color={theme.colors.electrical} style={{visibility: `${successMsgVisible ? `visible` : `hidden`}`}} >
                            Operation Completed Successfully.
                        </SystemComponent>
                        <SystemComponent color={theme.colors.alertAction} style={{visibility: `${failMsgVisible ? `visible` : `hidden`}`}} >
                            Operation failed. Please double-check the data within the uploaded CSV file.
                        </SystemComponent>
                    </SystemComponent>

                    <SystemComponent>
                        <Button onClick={onSubmit}>Upload</Button>
                    </SystemComponent>
                </SystemComponent>
            </SystemComponent>
        </PageTemplate>
    ); 
};
export default Update;