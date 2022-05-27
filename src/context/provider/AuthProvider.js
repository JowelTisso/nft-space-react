import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/auth/authReducer";

const AuthContext = createContext({ state: {}, dispatch: () => {} });

const AuthProvider = ({ children }) => {
  const defaultData = {
    token: "",
    user: {},
    loggedIn: false,
    activeAddress: {},
  };
  const [state, dispatch] = useReducer(reducer, defaultData);

  return (
    <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
