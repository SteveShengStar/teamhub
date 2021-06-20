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
 * @param {*} loginTransition
 * @param {*} dispatch
 */
const useLoginController = (loginTransition, dispatch, route) => { // TODO: Use route.pathname instead ?
    const router = useRouter()
    const { hydrated, token, user } = useSelector(state => state.userState)

    useEffect(() => {
        if (hydrated && token) {
            // Authenticate user. Check whether they are logged in (when loading a new page)
            api.auth.loginWithToken(token, dispatch, router).then(user => {
                // Update Redux Store with newly retrieved user info
                dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user }) 

                if (!useShouldRedirect(user, router)) {
                    loginTransition.show()   // show page-load animation as user is being redirected
                }
            }).catch(err => {
                console.error(err)
                if (!useShouldRedirect(user, router)) {
                    loginTransition.show()  // show page-load animation as user is being redirected
                }
            })
            return;
        } else {
            // Handle cases where the token is not stored in the frontend
            if (route && route === '/login') { 
                loginTransition.show();         
            } else {
                if (!useShouldRedirect(user, router)) {
                    loginTransition.show()      // TODO: Is this still needed ? Handles the authorize step. Make sure to examine the below condition.
                }
            }
        }
    }, [hydrated]);
}
export default useLoginController;