import { useEffect } from "react"
import { useSelector } from "react-redux"
import api from "../store/api"
import useShouldRedirect from "./useShouldRedirect"
import { useRouter } from "next/router"
import { UserTypes } from "../store/reducers/userReducer"

/**
 * @param {*} loginTransition
 * @param {*} dispatch
 */
const useLoginController = (loginTransition, dispatch, route) => {
    const router = useRouter()
    const { hydrated, token, user } = useSelector(state => state.userState)
    console.log("Login Controller Before Point")
    useEffect(() => {
        if (hydrated && token) {
            api.auth.loginWithToken(token, dispatch, router).then(user => {
                dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user })
                console.log("Calling useShouldRedirect")
                if (!useShouldRedirect(user, router)) {
                    loginTransition.show()
                }
                console.log("Exiting useShouldRedirect")
            }).catch(err => {
                console.error(err)
                console.log("Error: Calling useShouldRedirect")
                if (!useShouldRedirect(user,router)) {
                    loginTransition.show()
                }
                console.log("Error: Exiting useShouldRedirect")
            })
            return;
        }
        if (hydrated) {
            if (!useShouldRedirect(user,router)) {
                loginTransition.show()
            }
            return;
        }
    }, [hydrated])
    console.log("Login Controller After Point")
}
export default useLoginController;