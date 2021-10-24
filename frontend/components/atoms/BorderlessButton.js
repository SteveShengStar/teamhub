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
        color: 'action',
      },
      alert: {
        color: 'alertAction',
      },
      neutral: {
        color: 'black',
      },
      business: {
        color: 'business',
      },
      lim: {
        color: 'lim',
      },
      software: {
        color: 'software',
      },
      mechanical: {
        color: 'mechanical',
      },
      electrical: {
        color: 'electrical',
      },
      admin: {
        color: 'admin',
      },
      exec: {
        color: 'exec',
      },
      infrastructure: {
        color: 'infrastructure',
      },
      web: {
        color: 'web',
      },
    },
  })
);

export default BorderlessButton;
