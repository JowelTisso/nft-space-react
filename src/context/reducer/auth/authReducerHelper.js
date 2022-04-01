import { LOG_IN, LOG_OUT, SIGN_UP } from "../../../utils/Constant";

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
    default:
      return state;
  }
};
