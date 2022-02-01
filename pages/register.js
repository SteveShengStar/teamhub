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
                        <FieldSection title='First Name' />
                        <FieldSection title="Checkbox" type="checkbox" />
                    </SystemComponent>
                </Card>
            </SystemComponent>
        </PageTemplate>
    );
};

export default RegistrationForm;