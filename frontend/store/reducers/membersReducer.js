import api from "../api";

// use proxy to make object immutable
export const MemberReducerTypes = new Proxy({
    SET_ALL_MEMBERS: "SET_ALL_MEMBERS",
    SET_SELECTED_MEMBER: "SET_SELECTED_MEMBER",
    ADD_LOADED_MEMBER: "ADD_LOADED_MEMBER",
    LOAD_FILTERS: "LOAD_FILTERS"
}, {
    set: () => {
        throw new Error("Can't change const MemberReducerTypes")
    }
});

export const membersInitialState = {
    members: [],
    selectedMember: {},
    loadedMembers: {},
    filters: {}
}
export default (state = membersInitialState, action) => {
    switch (action.type) {
        case "SET_ALL_MEMBERS":
            return {
                ...state,
                members: action.payload
            }
        case "SET_SELECTED_MEMBER":
            return {
                ...state,
                selectedMember: action.payload
            }

        case "ADD_LOADED_MEMBER":
            const {
                _id,
            } = action.payload;
            return {
                ...state,
                loadedMembers: {
                    ...state.loadedMembers,
                    [_id]: action.payload
                }
            }
        case "LOAD_FILTERS":
            return {
                ...state,
                filters: action.payload
            }
        default:
            return state
    }
}

export async function searchMembers(dispatch, options = { isSSR: true }) {
    try {
      const res = await api.members.getAll(window.localStorage.getItem("refreshToken"), options, dispatch);
      console.log(res);
      if (res.success) {
        dispatch({
            type: MemberReducerTypes.SET_ALL_MEMBERS,
            payload: res.body
        });
      }
    } catch (err) {
      console.log('Error: Failed to initialize members - ', err);
    }
};

/**
 * 
 * @param {*} dispatch 
 * @param {string} token 
 * @param {string} id 
 */
export const lookupMember = async function(dispatch, token, id) {
    try {
        const res = await api.members.getMember(id, token, dispatch);
        if (res.success && res.body && res.body.length > 0) {
            dispatch({
                type: "ADD_LOADED_MEMBER",
                payload: res.body[0]
            });
            dispatch({
                type: "SET_SELECTED_MEMBER",
                payload: res.body[0]
            });
        }
    } catch (err) {
        console.log(`Error: Failed to fetch member with id ${id} `, err);
    }
};

export const getFilters = async function(dispatch, token) {
    try {
        const res = await api.members.getFilterOptions(token, dispatch);
        if (res.success && res.body) {
            dispatch({ type: MemberReducerTypes.LOAD_FILTERS, payload: res.body })
            return;
        }
    }
    catch(err) {

    }
}