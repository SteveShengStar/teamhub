import React from "react";
import Image from "../atoms/Image";
import { SystemComponent } from "../atoms/SystemComponents";
import Subtitle from "../atoms/Subtitle";

const PageTemplate = ({className, title, children}) => (
    <>
        <Image variant="background" src="/static/background.png" alt="background"/>
        <SystemComponent
            className={className}
            height="100%"
            display="grid"
            gridTemplateRows="100px 1fr"
            gridTemplateColumns="inherit"
            gridGap="titleBottomMargin"
            p="cardMargin"
        >
            <Subtitle as="h1" alignSelf="end" fontSize={["smallSubtitle","subtitle"]}>{title}</Subtitle>
            {React.Children.only(children)}
        </SystemComponent>
    </>
)

export default PageTemplate;