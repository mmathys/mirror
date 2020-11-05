import { GAPI_READY } from "./actionTypes";

interface GapiReadyAction {
  type: typeof GAPI_READY;
  payload: {ready: boolean};
}

export type GapiActionTypes = GapiReadyAction // .. | DeleteMessageAction

