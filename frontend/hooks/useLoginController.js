import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux";
import api from "../store/api";
import { UserTypes } from "../store/reducers/userReducer";
import { getFilters } from "../store/reducers/membersReducer";

/**
 * @param { () => void } onRender
 * @returns { { canRender: boolean } }
 */
export default (onRender) => {
    const router = useRouter();
    const [ count, setCount ] = useState(0); // Persist bug workaround, lmao should get rid of later
    const [ canRender, setCanRender ] = useState(router.pathname.startsWith("/"));
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userState);
    useEffect(() => {
        if (!userState.hydrated) return;
        // get refresh token
        if (userState.token) {
            redirectUser();
            return;
        };
        const token = window.localStorage.getItem("refreshToken");
        if (!token) {
            // if there is no refresh we take them to the login page
            if (router.pathname != "/login") router.push("/login");
            return;
        }
        if (!userState.user || !userState.user._id) {
            api.auth.loginWithToken(token).then(user => {
                if (user) {
                    dispatch({type: UserTypes.RECEIVED_LOGIN, token: token, payload: user })
                    redirectUser()
                }
                else if (router.pathname != "/login") router.push("/login");
            });
            return;
        };
        redirectUser();
    }, [userState]);

    function redirectUser() {
        // if user is logged in check user status
        if (!userState.user.name || !userState.user.name.display) {
            if (router.pathname != "/login/name") router.push("/login/name")
            return;
        }
        if (userState.user.subteams.length === 0 || !userState.user.memberType || !userState.user.projects.length === 0 || !userState.user.joined) {
            if (router.pathname != "/login/role") router.push("/login/role");
            return;
        }
        if (!userState.user.bio) {
            if (router.pathname != "/login/about") router.push("/login/about");
            return;
        }
        if (router.pathname.startsWith("/login")) {
            router.push("/");
            return;
        }
        setCanRender(true)
    }

    useEffect(() => {
        if (canRender) {
            onRender && onRender();
        }
    }, [canRender])

    return {
        canRender
    }
}