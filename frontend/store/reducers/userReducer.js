import api from "../api";

export const UserTypes = new Proxy({
    RECEIVED_LOGIN: "RECEIVED_LOGIN",
    FAILED_LOGIN: "FAILED_LOGIN"
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
        case UserTypes.RECEIVED_LOGIN:
            return {
                ...state,
                user: action.payload,
                ...(action.token && { token: action.token }),
                ...(action.display && {tempDisplayName: action.display })
            };
        case UserTypes.FAILED_LOGIN:
            return {
                ...state,
                token: "",
                user: {}
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
        const user = res && res.body && res.body[0] || res.body;
        if (user && user.token) {
            window.localStorage.setItem("refreshToken", user.token);
            dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user, token: user.token, display: response.profileObj.name });
        }
        else {
            dispatch({ type: UserTypes.FAILED_LOGIN })
        }
        return user;
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
 */
export const updateUser = async (dispatch, options, token, id) => {
    try {
        const res = await api.members.update(options, token, id, dispatch);
        if (res && res.success) {
            const user = await api.members.getMember(id, token, dispatch);
            if (user && user.success) {
                dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user.body[0] })
                return user;
            }
        }
        return;
    }
    catch(err) {
        throw new Error(err)
    }
}

export default userReducer;