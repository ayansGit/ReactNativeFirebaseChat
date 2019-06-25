import { combineReducers } from 'redux';
import chatReducer from './chatReducer';

const allReducers = combineReducers({
   chat: chatReducer,

})
export default allReducers