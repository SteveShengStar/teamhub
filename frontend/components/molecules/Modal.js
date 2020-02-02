import React from "react";
import {Background, ContentContainer} from '../atoms/ModalSubComponents';

const Modal = ({children, className, visible}) => {
    return (
        <Background visible={visible}>
            <ContentContainer 
                className={className}
                padding={["cardPaddingSmall", "cardPaddingSmall", "cardPadding"]}
                visible={visible}
            >
                {React.Children.only(children)}
            </ContentContainer>
        </Background>
    )
}

export default Modal;

