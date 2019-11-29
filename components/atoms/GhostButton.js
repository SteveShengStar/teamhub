import styled from 'styled-components';
import { variant } from 'styled-system';
import Button from './Button';

const GhostButton = styled(Button)(
    {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    variant({
        variants: {
            primary: {
                color: 'action',
                borderColor: 'action'
            },
            alert: {
                color: 'alertAction',
                borderColor: 'alertAction'
            },
            neutral: {
                color: 'black',
                borderColor: 'black'
            },
            software: {
                color: 'software',
                borderColor: 'software'
            },
            mechanical: {
                color: 'mechanical',
                borderColor: 'mechanical',
            },
            electrical: {
                color: 'electrical',
                borderColor: 'electrical'
            },
            admin: {
                color: 'admin',
                borderColor: 'admin'
            },
            exec: {
                color: 'exec',
                borderColor: 'exec'
            },
            infrastructure: {
                color: 'infrastructure',
                borderColor: 'infrastructure'
            }
        }
    })
);

export default GhostButton;