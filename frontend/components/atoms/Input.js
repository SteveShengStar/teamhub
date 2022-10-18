import styled from 'styled-components';
import { variant } from 'styled-system';
import { SystemInput } from './SystemComponents';

const Input = styled(SystemInput)(
    variant({
        variants: {
            text: {
                px: 3,
                py: '8px',
                borderColor: 'greys.1',
                borderWidth: 1,
                borderStyle: 'solid',
                transition: 'all 0.2s ease',
                borderRadius: 'small',
                '&:hover': {
                    borderColor: 'greys.4',
                },
                '&:focus': {
                    outline: 'none',
                    borderColor: 'action',
                },
                '&::placeholder': {
                    color: 'greys.2',
                },
                fontSize: 1,
            },
        },
    })
);
export default Input;
