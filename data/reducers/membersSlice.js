import { createSlice } from 'redux-starter-kit';

const membersSlice = createSlice({
    name: 'members',
    initialState: [],
    reducers: {
        addMember(state, action) {
            const newMemberObj = action.payload;
            state.push(newMemberObj);
        },
        removeMember(state, action) {
            const idToRemove = action.payload;
            return state.filter((member) => {
                return member.id !== idToRemove;
            });
        }
    }
});

export const { addMember, removeMember } = membersSlice.actions;

export default membersSlice.reducer;
