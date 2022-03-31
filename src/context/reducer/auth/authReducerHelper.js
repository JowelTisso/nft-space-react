import { LOG_IN, LOG_OUT, SIGN_UP } from "../../../utils/Constant";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: "",
        user: {},
      };
    case LOG_OUT:
      return {
        ...state,
        token: "",
        user: {},
      };
    case SIGN_UP:
      return {
        ...state,
        token: "",
        user: {},
      };
    default:
      return state;
  }
};
