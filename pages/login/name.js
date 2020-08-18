import React, { useState } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import LoginNameCard from '../../frontend/components/molecules/LoginNameCard';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../frontend/store/reducers/userReducer';
import useLoginTransition from '../../frontend/hooks/useLoginTransition';
import useLoginController from '../../frontend/hooks/useLoginController';
import { useRouter } from 'next/router';
import useShouldRedirect from '../../frontend/hooks/useShouldRedirect';
import LoadingModal from '../../frontend/components/atoms/LoadingModal';

const Name = () => {
    const router = useRouter()
    const { user, token,tempDisplayName } = useSelector(state => state.userState)
    const dispatch = useDispatch();
    const [ nameInput, setNameInput ] = useState(tempDisplayName || "");

    const loginTransition = useLoginTransition()
    useLoginController(loginTransition, dispatch, router.pathname)

    const trySubmit = () => {
        if (!nameInput) {
            window.alert("No name entered!")
        }
        loginTransition.setVisible(false)
        updateUser(dispatch, { name: { display: nameInput, first: user.name.first, last: user.name.last }}, token, user._id, router).then(user => {
            useShouldRedirect(user, router)
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
export default Name;
