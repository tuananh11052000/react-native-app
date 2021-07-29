import countNumber from './countNumber'
import newestPost from './newestPost'
import auth from './authentication'
import address from './address'
import infoPost from './infoPost'

import { combineReducers } from "redux";

var reducer = combineReducers({ countNumber, newestPost, auth, address, infoPost });

export default reducer;