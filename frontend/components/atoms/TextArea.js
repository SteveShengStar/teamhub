import styled from 'styled-components';
import { variant } from 'styled-system';
import { SystemTextArea } from './SystemComponents';

const TextArea = styled(SystemTextArea)(
    variant({
        variants: {
            default: {
                boxSizing: 'border-box',
                borderWidth: 1,
                borderRadius: 'default',
                borderStyle: 'solid',
                borderColor: 'greys.1',
                width: '100%',
                height: '5.5em',
                resize: 'none',
                padding: '8px',

                '&:hover': {
                    borderColor: 'greys.3',
                },
                '&:focus': {
                    outline: 'none',
                    borderColor: 'action',
                },
                '&::placeholder': {
                    color: 'greys.2',
                },

                fontFamily: 'body',
                fontWeight: 0,
                fontSize: 1,
            },
        },
    })
);

TextArea.defaultProps = {
    variant: 'default',
};
export default TextArea;
