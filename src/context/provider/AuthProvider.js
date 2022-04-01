import { createContext, useContext } from "react";
import { authReducer } from "../reducer/auth/AuthReducer";

const AuthContext = createContext({ state: {}, dispatch: () => {} });

const AuthProvider = ({ children }) => {
  const { state, dispatch } = authReducer();

  return (
    <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
