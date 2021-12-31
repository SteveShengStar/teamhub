import React from 'react';

import { SystemComponent } from '../atoms/SystemComponents';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import Button from '../atoms/Button';
import { userLogout } from '../../store/reducers/userReducer';
import { useSelector } from 'react-redux';
import useShouldRedirect from '../../hooks/useShouldRedirect';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { hydrated, user } = useSelector(state => state.userState)

    const logOut = () => {
        console.log("Logging Out - Begin");
        userLogout(user._id, dispatch, router).then(() => {
            useShouldRedirect({}, router);
            console.log("Logging Out - Complete");
        });
    };

    return (
        <SystemComponent ml={7}>
            <Button
                style={{ fontFamily: 'Nunito Sans' }}
                onClick={logOut}
                disabled={!hydrated}
            >
                Log Out
            </Button>
        </SystemComponent>
    );
};
export default LogoutButton;