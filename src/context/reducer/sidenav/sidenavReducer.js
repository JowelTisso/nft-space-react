import { TOGGLE_NAV } from "../../../utils/Constant";

export const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_NAV:
      return {
        ...state,
        visible: !state.visible,
      };
    default:
      return state;
  }
};
