import { createSlice } from 'redux-starter-kit';

import * as memberService from '../api/services/memberService';
import memberSchema from '../api/schema/memberSchema';

const memberSlice = createSlice({
    name: 'membersState',
    initialState: {
        members: [],
        selectedMemberId: {},
        loadedMembers: {}
    },
    reducers: {
        setAllMembers(state, action) {
            console.log(action)
            return {
                ...state,
                members: action.payload
            };
        },
        setSelectedMemberId(state, action) {
            const selectedMemberId = action.payload;
            return {
                ...state,
                selectedMemberId
            };
        },
        addLoadedMember(state, action) {
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
        }
    }
});

export const { setSelectedMemberId, addLoadedMember } = memberSlice.actions;

export default memberSlice.reducer;

export const loadAllMembers = function(options = { isSSR: true, age: true }) {
  return async function(dispatch) {
    try {
      const res = await memberService.getAll(options);
      if (res.success) {
        dispatch(memberSlice.actions.setAllMembers(res.body));
      }
    } catch (err) {
      console.log('Error: Failed to initialize members - ', err);
    }
  };
};

export const loadSelectedMember = function(id) {
    return async function(dispatch) {
        try {
            const res = await memberService.get(id);
            if (res.success) {
                const normalizedData = normalize(res, memberSchema);
                dispatch(
                    memberSlice.actions.setSelectedMember(normalizedData.entities)
                );
            }
        } catch (err) {
            console.log(`Error: Failed to fetch member with id ${id} `, err);
        }
    };
};