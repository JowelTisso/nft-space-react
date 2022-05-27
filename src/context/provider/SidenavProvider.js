import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/sidenav/sidenavReducer";

const SidenavContext = createContext({ state: {}, dispatch: () => {} });

const SidenavProvider = ({ children }) => {
  const defaultData = {
    visible: false,
  };
  const [state, dispatch] = useReducer(reducer, defaultData);

  return (
    <SidenavContext.Provider
      value={{ sidenavState: state, sidenavDispatch: dispatch }}
    >
      {children}
    </SidenavContext.Provider>
  );
};

const useSidenav = () => useContext(SidenavContext);

export { SidenavProvider, useSidenav };
