import countNumber from "./countNumber";
import newestPost from "./newestPost";
import auth from "./authentication";
import address from "./address";
import infoPost from "./infoPost";
import myPost from "./myPost";
import controlThreadTCD from "./redirectScreen";
import controlThreadGiveFor from "./redirectGiveFor";
import dataCategory from "./dataCategory";
import register from "./register"
import profile from './profile'
import controlConfirmAddress from './redirectConfirmAddress';
import isDisplay from "./isDisplay";
import reloadPost from './reloadPost';
import redirectComplete from './redirectComplete';
import redirectTransaction from './redirectTransaction';
import dataTrans from './dataTransaction';
import { combineReducers } from "redux";

var reducer = combineReducers({
  countNumber,
  newestPost,
  auth,
  address,
  infoPost,
  myPost,
  controlThreadTCD,
  controlThreadGiveFor,
  dataCategory,
  register,
  profile,
  controlConfirmAddress,
  isDisplay,
  reloadPost,
  redirectComplete,
  redirectTransaction,
  dataTrans
});

export default reducer;
