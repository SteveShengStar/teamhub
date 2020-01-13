import { combineReducers } from 'redux';

import memberReducer from './reducers/memberSlice';

export default combineReducers({
    membersState: memberReducer
});
