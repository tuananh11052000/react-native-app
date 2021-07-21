import countNumber from './countNumber'
import newestPost from './newestPost'
import auth from './authentication'

import { combineReducers } from "redux";

var reducer = combineReducers({ countNumber, newestPost, auth });

export default reducer;