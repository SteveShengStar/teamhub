import styled from "styled-components";
import { SystemComponent } from './SystemComponents';

const ButtonWrapper = styled(SystemComponent)`
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;

    display: flex;
    height: 100px;
    width: 30px;
`;
const NextSymbol = styled(SystemComponent)`
    position: relative;
    bottom: 25px;

    color: black;
    margin: auto;
    font-size: 112px;

    opacity: 0.5;
    filter: alpha(opacity=50); /* For IE8 and earlier */

    ${ButtonWrapper}:hover & {
        opacity: 0.25;
        filter: alpha(opacity=25); /* For IE8 and earlier */

        font-size: 120px;
        bottom: 31px;
    }
`;

const NextSetButton = ({onSelect}) => {
    return (
        <ButtonWrapper onClick={() => {onSelect()}}>
            <NextSymbol>&rsaquo;</NextSymbol>
        </ButtonWrapper>
    )
};
export default NextSetButton;