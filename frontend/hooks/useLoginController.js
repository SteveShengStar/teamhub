import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from "../store/api"
import useShouldRedirect from "./useShouldRedirect"
import { useRouter } from "next/router"
import { UserTypes } from "../store/reducers/userReducer"

/**
 * Authenticate the user (confirm he is logged in). 
 * Then, route the user to the appropriate signup/login page if necessary.
 * 
 * @param {*} dispatch
 */
const useLoginController = (dispatch) => { // TODO: Use route.pathname instead ?
    const router = useRouter()
    const { hydrated, token } = useSelector(state => state.userState)

    useEffect(() => {
        if (hydrated && token) {
            // Authenticate user. Check whether they are logged in (when loading a new page)
            api.auth.loginWithToken(token, dispatch, router).then(user => {
                // Update Redux Store with newly retrieved user info
                dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user }) 
                useShouldRedirect(user, router, "", token);
            }).catch(err => {
                console.error(err)
            })
            return;
        }
    }, [hydrated]);
}
export default useLoginController;