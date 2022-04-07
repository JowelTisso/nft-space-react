import {
  LOG_IN,
  LOG_OUT,
  SET_ACTIVE_ADDRESS,
  SIGN_UP,
} from "../../../utils/Constant";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loggedIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        token: "",
        user: {},
        loggedIn: false,
      };
    case SIGN_UP:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loggedIn: true,
      };
    case SET_ACTIVE_ADDRESS:
      return {
        ...state,
        activeAddress: action.payload.address,
      };
    default:
      return state;
  }
};
