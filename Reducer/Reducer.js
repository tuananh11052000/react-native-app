import countNumber from './countNumber'
import newestPost from './newestPost'
import auth from './authentication'
import address from './address'
import infoPost from './infoPost'
import myPost from './myPost'

import { combineReducers } from "redux";

var reducer = combineReducers({ countNumber, newestPost, auth, address, infoPost, myPost });

export default reducer;