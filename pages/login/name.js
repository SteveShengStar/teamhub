import React, { useState } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import LoginNameCard from '../../frontend/components/molecules/LoginNameCard';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../frontend/store/reducers/userReducer';
import useLoginTransition from '../../frontend/hooks/useLoginTransition';
import useLoginController from '../../frontend/hooks/useLoginController';
import { useRouter } from 'next/router';
import useRedirect from '../../frontend/hooks/useRedirect';
import LoadingModal from '../../frontend/components/atoms/LoadingModal';

export default () => {
    const router = useRouter()
    const { user, token,tempDisplayName } = useSelector(state => state.userState)
    const dispatch = useDispatch();
    const [ nameInput, setNameInput ] = useState(tempDisplayName || "");

    const loginTransition = useLoginTransition()
    useLoginController(loginTransition, dispatch, router.pathname)

    const trySubmit = () => {
        // If user did not specify a nameInput, display error.
        if (!nameInput) {
            window.alert("No name entered!")
        }
        loginTransition.setVisible(false)

        
        // Persist the newly entered user information to the database
        updateUser(dispatch, { name: { display: nameInput, first: user.name.first, last: user.name.last }}, token, user._id, router).then(user => {
            useRedirect(user, router)
        })
    }

    return (
        <>
            <PageTemplate myHubHidden title="Onboarding">
                <LoginTransition transitionRef={loginTransition.ref}>
                    <LoginNameCard submit={trySubmit} nameInput={nameInput} setNameInput={setNameInput} />
                </LoginTransition>
            </PageTemplate>
            <LoadingModal visible={!loginTransition.visible} />
        </>
    )
};
