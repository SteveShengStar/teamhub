import React, { useState } from 'react';

import PageTemplate from '../../frontend/components/templates/PageTemplate';
import LoginNameCard from '../../frontend/components/molecules/LoginNameCard';
import LoginTransition from '../../frontend/components/templates/LoginTransition';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../frontend/store/reducers/userReducer';
import { useRouter } from 'next/router';

const Home = () => {
    const user = useSelector(state => state.userState.user)
    const dispatch = useDispatch();
    const router = useRouter();
    const [ nameInput, setNameInput ] = useState(user && user.tempDisplayName || "");
    const [ shouldHide, setShouldHide ] = useState(false);

    const trySubmit = () => {
        if (!nameInput) {
            window.alert("No name entered!")
        }
        setShouldHide(true);
        updateUser(dispatch, { name: { display: nameInput, first: user.name.first, last: user.name.last }}, user.token, user._id).then(() => {
            router.push("/login/role")
        });
    }

    return (
        <PageTemplate myHubHidden title="Onboarding">
            <LoginTransition shouldHide={shouldHide}>
                <LoginNameCard submit={trySubmit} nameInput={nameInput} setNameInput={setNameInput} />
            </LoginTransition>
        </PageTemplate>
    )
};
export default Home;
