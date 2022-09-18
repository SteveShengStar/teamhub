import React from 'react';

const MailIcon = ({ className }) => (
    <svg
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 16 16'
    >
        <path
            d='M14,4H3.333A1.332,1.332,0,0,0,2.007,5.333l-.007,8a1.337,1.337,0,0,0,1.333,1.333H14a1.337,1.337,0,0,0,1.333-1.333v-8A1.337,1.337,0,0,0,14,4Zm0,2.667L8.667,10,3.333,6.667V5.333L8.667,8.667,14,5.333Z'
            transform='translate(-0.667 -1.333)'
            fill='#131313'
        />
        <path d='M0,0H16V16H0Z' fill='none' />
    </svg>
);

export default MailIcon;
