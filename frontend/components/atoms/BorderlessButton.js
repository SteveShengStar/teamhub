import styled from 'styled-components';
import { variant } from 'styled-system';

import Button from './Button';

const BorderlessButton = styled(Button)(
    {
        backgroundColor: 'transparent',
        padding: 0,
    },
    variant({
        variants: {
            primary: {
                color: 'action'
            },
            alert: {
                color: 'alertAction'
            },
            neutral: {
                color: 'black'
            },
            software: {
                color: 'software'
            },
            mechanical: {
                color: 'mechanical',
            },
            electrical: {
                color: 'electrical'
            },
            admin: {
                color: 'admin',
            },
            exec: {
                color: 'exec'
            },
            infrastructure: {
                color: 'infrastructure'
            }
        }
    })
);

export default BorderlessButton;