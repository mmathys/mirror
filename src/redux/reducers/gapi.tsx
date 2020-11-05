import { GapiActionTypes } from "../types";
import { GAPI_READY } from "../actionTypes";

interface GapiState {
  ready: boolean;
}

const initialState: GapiState = { ready: false };

const gapi = (state = initialState, action: GapiActionTypes): GapiState => {
  switch (action.type) {
    case GAPI_READY: {
      return { ...state, ready: action.payload.ready };
    }
    default: {
      return state;
    }
  }
};

export default gapi