import countNumber from './countNumber'
import newestPost from './newestPost'
import { combineReducers } from "redux";

var reducer = combineReducers({ countNumber, newestPost });

export default reducer;