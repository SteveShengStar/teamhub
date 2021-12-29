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
    const { _id: userId } = useSelector(state => state.userState.user);

    const logOut = () => {
        console.log("Logging Out - Begin");
        userLogout(userId, dispatch).then(() => {
            useShouldRedirect({}, router);
            console.log("Logging Out - Complete");
        });
    };

    return (
        <SystemComponent ml={7}>
            <Button
                style={{ fontFamily: 'Nunito Sans' }}
                onClick={logOut}
            >
                Log Out
            </Button>
        </SystemComponent>
    );
};
export default LogoutButton;