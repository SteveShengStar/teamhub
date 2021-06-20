import React, { useState } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import LoginNameCard from '../../frontend/components/molecules/LoginNameCard';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserAndGetToken } from '../../frontend/store/reducers/userReducer';
import useLoginTransition from '../../frontend/hooks/useLoginTransition';
import { useRouter } from 'next/router';
import useShouldRedirect from '../../frontend/hooks/useShouldRedirect';
import LoadingModal from '../../frontend/components/atoms/LoadingModal';


const Name = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { user, tempDisplayName } = useSelector(state => state.userState)
    const [ nameInput, setNameInput ] = useState(tempDisplayName || "");

    // Token is missing if user accessed this page directly or if user is being directed here for the first time.
    // TODO: use cookies and sessions

    const trySubmit = () => {
        if (!nameInput) {
            // If user did not specify a nameInput, display error.
            window.alert("No name entered!")
        }
        loginTransition.setVisible(false)

        // Persist the newly entered user information to the database
        updateUserAndGetToken(dispatch, { name: { display: nameInput, first: user.name.first, last: user.name.last }}, user._id, router)
            .then(user => {
                useShouldRedirect(user, router)
            })
    }

    return (
        <>
            <PageTemplate title="Onboarding">
                <LoginTransition transitionRef={loginTransition.ref}>
                    <LoginNameCard submit={trySubmit} nameInput={nameInput} setNameInput={setNameInput} />
                </LoginTransition>
            </PageTemplate>
            <LoadingModal visible={!loginTransition.visible} />
        </>
    )
};
export default Name;
