import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/auth/authReducer";

const AuthContext = createContext({ state: {}, dispatch: () => {} });

const emptyAddress = {
  _id: "",
  name: "",
  mobile: "",
  address: "",
  pin: "",
  city: "",
  state: "",
  landmark: "",
};
const AuthProvider = ({ children }) => {
  const defaultData = {
    token: "",
    user: {},
    loggedIn: false,
    activeAddress: emptyAddress,
  };

  const [state, dispatch] = useReducer(reducer, defaultData);

  return (
    <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, emptyAddress };
