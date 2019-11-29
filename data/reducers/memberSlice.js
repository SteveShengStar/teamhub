import { createSlice } from 'redux-starter-kit';
import { normalize } from 'normalizr';

import * as memberService from '../api/services/memberService';
import memberSchema from '../api/schema/memberSchema';

const memberSlice = createSlice({
    name: 'members',
    initialState: {
        exampleState: [],
        skills: {},
        interests: {},
        memberTypes: {},
        subteams: {},
        projects: {},
        streams: {},
        members: {},
        selectedMember: {}
    },
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
        setSelectedMember(state, action) {
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
                skills: { ...state.skills, ...skills },
                interests: { ...state.interests, ...interests },
                memberTypes: { ...state.memberTypes, ...memberTypes },
                subteams: { ...state.subteams, ...subteams },
                projects: { ...state.projects, ...projects },
                streams: { ...state.streams, ...streams },
                selectedMember: Object.values(members)[0]
            };
        },
        addMember(state, action) {
            const newMemberObj = action.payload;
            state.exampleState.push(newMemberObj);
        },
        removeMember(state, action) {
            const idToRemove = action.payload;
            state.exampleState = state.exampleState.filter((member) => {
                return member.id !== idToRemove;
            });
        }
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
                dispatch(memberSlice.actions.setAllMembers(normalizedData.entities));
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
                console.log(normalizedData.entities.members);
                dispatch(
                    memberSlice.actions.setSelectedMember(normalizedData.entities)
                );
            }
        } catch (err) {
            console.log(`Error: Failed to fetch member with id ${id} `, err);
        }
    };
};
