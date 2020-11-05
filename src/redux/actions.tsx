import { ADD_TODO, TOGGLE_TODO, SET_FILTER, GAPI_READY } from "./actionTypes";
import { GapiActionTypes } from "./types";

let nextTodoId = 0;

export const setGapiReady = (ready: boolean) : GapiActionTypes => ({
  type: GAPI_READY,
  payload: { ready }
})

export const setFilter = (filter: any) => ({ type: SET_FILTER, payload: { filter } });
