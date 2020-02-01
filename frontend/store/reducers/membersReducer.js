import * as memberService from '../api/services/memberService';

export const SET_ALL_MEMBERS = "SET_ALL_MEMBERS";
export const SET_SELECTED_MEMBER = "SET_SELECTED_MEMBER";
export const ADD_LOADED_MEMBER = "ADD_LOADED_MEMBER";


export const membersInitialState = {
    members: [],
    selectedMember: {},
    loadedMembers: {}
}
export const membersStateReducer = (state = membersInitialState, action) => {
    switch (action.type) {
        case SET_ALL_MEMBERS:
            return {
                ...state,
                members: action.payload
            }
        case SET_SELECTED_MEMBER:
            return {
                ...state,
                selectedMember: action.payload
            }

        case ADD_LOADED_MEMBER:
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
        default:
            return state
    }
}

export async function searchMembers(dispatch, options = { isSSR: true }) {
    try {
      const res = await memberService.getAll(options);
      if (res.success) {
        dispatch({
            type: SET_ALL_MEMBERS,
            payload: res.body
        });
      }
    } catch (err) {
      console.log('Error: Failed to initialize members - ', err);
    }
};

export const lookupMember = async function(dispatch, id) {
    try {
        const res = await memberService.get(id);
        if (res.success && res.body && res.body.length > 0) {
            dispatch({
                type: ADD_LOADED_MEMBER,
                payload: res.body[0]
            });
            dispatch({
                type: SET_SELECTED_MEMBER,
                payload: res.body[0]
            })
        }
    } catch (err) {
        console.log(`Error: Failed to fetch member with id ${id} `, err);
    }
};