import { combineReducers } from "redux";
import gapi from "./gapi";
import visibilityFilter from "./visibilityFilter";

export default combineReducers({ gapi, visibilityFilter });