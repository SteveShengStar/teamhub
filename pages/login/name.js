import React, { useState } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import LoginNameCard from '../../frontend/components/molecules/LoginNameCard';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../frontend/store/reducers/userReducer';
import useLoginTransition from '../../frontend/hooks/useLoginTransition';
import useLoginController from '../../frontend/hooks/useLoginController';
import { useRouter } from 'next/router';
import useRedirect from '../../frontend/hooks/useRedirect';

export default () => {
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
        loginTransition.hide()
        updateUser(dispatch, { name: { display: nameInput, first: user.name.first, last: user.name.last }}, token, user._id, router).then(user => {
            console.log(user)
            useRedirect(user, router)
        })
    }

    return (
        <PageTemplate myHubHidden title="Onboarding">
            <LoginTransition loginTransition={loginTransition}>
                <LoginNameCard submit={trySubmit} nameInput={nameInput} setNameInput={setNameInput} />
            </LoginTransition>
        </PageTemplate>
    )
};
