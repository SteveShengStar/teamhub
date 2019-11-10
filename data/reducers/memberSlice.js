import { createSlice } from 'redux-starter-kit';
import { normalize } from 'normalizr';

import * as memberService from '../api/services/memberService';
import memberSchema from '../api/schema/memberSchema';

const memberSlice = createSlice({
    name: 'members',
    initialState: {},
    reducers: {
        setAllMembers(state, action) {
            const {
                skills,
                interests,
                memberTypes,
                subteams,
                projects,
                streams,
                members
            } = action.payload;
            return {
                ...state,
                skills,
                interests,
                memberTypes,
                subteams,
                projects,
                streams,
                members
            };
        },
        addMember(state, action) {},
        removeMember(state, action) {}
    }
});

export const { addMember, removeMember } = memberSlice.actions;

export default memberSlice.reducer;

export const loadAllMembers = function() {
    return async function(dispatch) {
        try {
            const res = await memberService.getAll();
            if (res.success) {
                const normalizedData = normalize(res, memberSchema);
                dispatch(
                    memberSlice.actions.setAllMembers(normalizedData.entities)
                );
            }
        } catch (err) {
            console.log('Error: Failed to initialize members - ', err);
        }
    };
};
