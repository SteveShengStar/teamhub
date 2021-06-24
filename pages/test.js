import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import PageTemplate from '../frontend/components/templates/PageTemplate';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useLoginTransition from '../frontend/hooks/useLoginTransition';
import useLoginController from '../frontend/hooks/useLoginController';
import { ThemeContext } from 'styled-components';
import Button from '../frontend/components/atoms/Button';
import { refreshable } from '../frontend/store/api/baseApi';

export default () => {
    const theme = useContext(ThemeContext);
    const router = useRouter();
    const dispatch = useDispatch()
    const loginTransition = useLoginTransition()
    useLoginController(loginTransition, dispatch, router.pathname);

    const { token, hydrated, user } = useSelector(state => state.userState);  // token:    user authentication token. 

    return (
        <>
            <PageTemplate>
                <Button onClick={() => {
                    if (hydrated && token) {
                        refreshable('/api/calendar/list', token, {
                            method: "POST",
                            headers: {
                              "Accept": "application/json",
                              "Content-Type": "application/json",
                            },
                        },
                        dispatch, router);
                    }
                }}>
                    List Google Calendar Events
                </Button>
            </PageTemplate>
        </>
    )
}
    
