import React from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import Login from '../../frontend/components/molecules/loginCard';

export default () => 
    <PageTemplate myHubHidden={true}>
        <LoginTransition>
            <Login />
        </LoginTransition>
    </PageTemplate>
