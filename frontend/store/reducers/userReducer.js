import api from "../api";

export const UserTypes = new Proxy({
    RECEIVED_LOGIN: "RECEIVED_LOGIN",
    FAILED_LOGIN: "FAILED_LOGIN",
    UPDATE_INFO: "UPDATE_INFO",
    UPDATE_TOKEN: "UPDATE_TOKEN"
}, {
    set: () => {
        throw new Error("Can't mutate type UserTypes")
    }
});

export const usersInitialState = {
    user: {},
    token: "",
    tempDisplayName: "",
    hydrated: false
}


const userReducer = (state = usersInitialState, action) => {
    switch (action.type) {
        case UserTypes.UPDATE_INFO:
            return {
                ...state,
                user: action.payload
            };
        case UserTypes.RECEIVED_LOGIN: 
            return {
                ...state,
                user: action.payload,
                ...(action.token && { token: action.token }),
                ...(action.display && {tempDisplayName: action.display })
            };
        case UserTypes.FAILED_LOGIN: // TODO: look at what this behaviour will lead to
            return {
                ...state,
                token: "",
                user: {}
            }
        case UserTypes.UPDATE_TOKEN: // TODO: Remove later
            console.log("action")
            console.log(action)
            return {
                ...state,
                token: action.token,
            }
        case "persist/REHYDRATE":
            const userState = action.payload && action.payload.userState
            return {
                ...state,
                ...(userState && { ...userState }),
                hydrated: true
            }
        default:
            return state
    }
}

/**
 * 
 * @param {*} response Google response
 * @param {*} dispatch Redux dispatcher
 */
export const userLogin = async (response, dispatch) => {
    try {
        const res = await api.auth.login(response);
        const user = res && res.body && res.body || res.body.user;
        if (user && user.token) {
            dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user, token: user.token, display: response.profileObj.name });
        }
        else {
            dispatch({ type: UserTypes.FAILED_LOGIN })
        }
        return res.body;
    }
    catch(err) {
        // TODO: Handle error 
        throw new Error(err);
    }
}

/**
 * 
 * @param {*} options 
 * @param {string} token 
 * @param {string} id 
 * @param {boolean} signUp   Indicates whether the user is signing up for the first time.
 */
export const updateUser = async (dispatch, options, token, id, router, signUp = true) => {
    try {
        // TODO: think about just doing the post request only. RN, we need a second request becuase first request has missing fields.
        const res = await api.members.update(options, token, id, dispatch, router);
        if (res && res.success) {
            const user = await api.members.getMember(id, token, dispatch, router);
            if (user && user.success) {
                if (signUp) {
                    dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user.body[0] })
                }
                else {
                    dispatch({ type: UserTypes.UPDATE_INFO, payload: user.body[0] })
                }
                return user.body[0];
            }
        }
        return; // TODO: handle error
    }
    catch(err) {
        throw new Error(err)
    }
}

/**
 * Retrieves user profile info
 * 
 * @param {string} token 
 * @param {string} id 
 * @returns 
 */
export const getProfileInfo = async function(dispatch, token, id, router) {
    try {
        const user = await api.members.getMember(id, token, dispatch, router);
        // TODO: potentially eliminate this store update afterwards.
        dispatch({ type: UserTypes.UPDATE_INFO, payload: user.body[0] });
        return user.body[0];
    } catch(err) {
        console.log(`Error: Failed to return profile data for user with id: ${id} `, err);
    }
}

/**
 * Retrieves user access token
 * 
 * @param {string} id 
 * @returns 
 */
export const getAccessToken = async function(dispatch, id) {
    try {
        const result = await api.members.getAccessToken(id);
        dispatch({ type: UserTypes.UPDATE_TOKEN, token: result.body[0].token });
    } catch(err) {
        console.log(`Error: Failed to return profile data for user with id: ${id} `, err);
    }
}

export default userReducer;