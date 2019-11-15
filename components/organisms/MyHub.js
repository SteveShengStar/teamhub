import React from "react";
import { SystemComponent } from "../atoms/SystemComponents";
import Card from "../atoms/Card";
import Subtitle from "../atoms/Subtitle";
import { PageTemplateGridLayout } from "../templates/PageTemplate";


const MyHub = () => {
    return (
        <Card 
            width="280px" 
            height="inherit" 
            borderRadius="none"
            py="cardMargin"
        >
            <PageTemplateGridLayout>
                <Subtitle alignSelf="end">My Hub</Subtitle>
            </PageTemplateGridLayout>
        </Card>
    )
}

export default MyHub;