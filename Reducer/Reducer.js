import countNumber from './countNumber'
import newestPost from './newestPost'
import auth from './authentication'
import address from './address'

import { combineReducers } from "redux";

var reducer = combineReducers({ countNumber, newestPost, auth, address });

export default reducer;