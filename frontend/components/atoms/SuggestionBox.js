import { SystemComponent, SystemSpan } from './SystemComponents';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HoverBox = styled(SystemComponent)`
    position: absolute;
    top: -20px;
    z-index: 10;

    border-radius: 5px;
    background-color: lightblue;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 4px;
    padding-bottom: 4px;

    opacity: 0.9;
    cursor: pointer;
`;

class SuggestionBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { value, visible, handleClick } = this.props;

        if (value && visible) {
            return (
                <HoverBox onClick={handleClick}>
                    <SystemSpan opacity={1}>{value}</SystemSpan>
                </HoverBox>
            );
        } else {
            return <></>;
        }
    }
}

SuggestionBox.propTypes = {
    value: PropTypes.string,
};

export default SuggestionBox;
