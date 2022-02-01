import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from "styled-components";

import PageTemplate from '../frontend/components/templates/PageTemplate';
import { SystemComponent, SystemSpan } from '../frontend/components/atoms/SystemComponents';
import Subtitle from "../frontend/components/atoms/Subtitle";
import Card from '../frontend/components/atoms/Card';
import FieldSection from "../frontend/components/molecules/Form/FieldSection";

const FormHeader = ({title, marginBottom}) => {
    const theme = useContext(ThemeContext);

    return (
        <SystemComponent
            fontSize={theme.fontSizes.header3}
            textAlign='center'
            mb={marginBottom}
        >
            <SystemSpan>
                <Subtitle>{title}</Subtitle>
            </SystemSpan>
        </SystemComponent>
    );
}

const RegistrationForm = () => {
    const theme = useContext(ThemeContext);

    const [formValues, setFormValues] = useState({
        fullName:  "",
        phoneNumber: null, 
        email: "", 
        program: "", 
        studentId:null,  
    });

    const handleInputChange = (name, value) => {
        console.log(value)
        setFormValues({...formValues, [name]: value});
    }

    return (
        <PageTemplate>
            <SystemComponent>
                <Card
                    width={["100%", "768px"]}
                    margin={["cardMarginSmall", "auto"]}
                    padding={["cardPaddingSmall", "cardPaddingSmall", "cardPadding"]}
                >
                    <FormHeader
                        title="Tell us more About You"
                        marginBottom={theme.space.titleBottomMargin}
                    />
                    <SystemComponent
                        display="grid"
                        gridTemplateColumns="1fr"
                        gridAutoRows="autofill"
                        gridAutoFlow="row"
                        gridGap={["cardPadding", "cardMargin", "cardMargin"]}
                        justifyItems="start"
                        overflowY="auto"
                    >
                        <FieldSection 
                        title='Full Name '
                        asterik={true}                     
                            name="fullName"
                            value={formValues['fullName']}
                            onChange={handleInputChange}        
                            />
                        <SystemComponent></SystemComponent>
                    </SystemComponent>
                    <SystemComponent
                        display="grid"
                        gridTemplateColumns="1fr"
                        gridAutoRows="autofill"
                        gridAutoFlow="row"
                        gridGap={["cardPadding", "cardMargin", "cardMargin"]}
                        justifyItems="start"
                        overflowY="auto"
                    >
                        <FieldSection 
                        title='Phone Number'      
                        name="phoneNumber"
                        value={formValues['phoneNumber']} 
                        onChange={handleInputChange}
                        />
                        
                        <SystemComponent></SystemComponent>
                    </SystemComponent>
                    <SystemComponent
                        display="grid"
                        gridTemplateColumns="1fr"
                        gridAutoRows="autofill"
                        gridAutoFlow="row"
                        gridGap={["cardPadding", "cardMargin", "cardMargin"]}
                        justifyItems="start"
                        overflowY="auto"
                    >
                        <FieldSection 
                        title='Personal Email Address'                             
                        name="email"
                        value={formValues['email']}
                        onChange={handleInputChange}
                        />

                        <SystemComponent></SystemComponent>
                    </SystemComponent>
                    <SystemComponent
                        display="grid"
                        gridTemplateColumns="1fr"
                        gridAutoRows="autofill"
                        gridAutoFlow="row"
                        gridGap={["cardPadding", "cardMargin", "cardMargin"]}
                        justifyItems="start"
                        overflowY="auto"
                    >
                        <FieldSection 
                        title='Program '
                        asterik={true}                     
                        name="program"
                        value={formValues['[program]']}
                        onChange={handleInputChange}        
                        />
                        <SystemComponent></SystemComponent>
                    </SystemComponent>
                    <SystemComponent
                        display="grid"
                        gridTemplateColumns="1fr"
                        gridAutoRows="autofill"
                        gridAutoFlow="row"
                        gridGap={["cardPadding", "cardMargin", "cardMargin"]}
                        justifyItems="start"
                        overflowY="auto"
                    >
                        <FieldSection 
                        title='Student ID # ' 
                        asterik={true}
                        name="studentId"
                        value={formValues['[studentId]']}
                        onChange={handleInputChange}
                         /> 
                        <SystemComponent></SystemComponent>
                    </SystemComponent> 
                </Card>
            </SystemComponent>
        </PageTemplate>
    );
};

export default RegistrationForm;