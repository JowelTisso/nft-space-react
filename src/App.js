import "./App.css";
import { useEffect } from "react";
import Header from "./components/header/Header";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "react-hot-toast";
import { SET_ACTIVE_ADDRESS } from "./utils/Constant";
import { useAuth } from "./context/provider/AuthProvider";

function App() {
  const toastOption = {
    className: "alert",
    duration: 2000,
    style: {
      fontWeight: 100,
    },
  };

  const { authState, authDispatch } = useAuth();

  useEffect(() => {
    if (authState.user?.addresses?.length > 0) {
      authDispatch({
        type: SET_ACTIVE_ADDRESS,
        payload: { address: authState.user?.addresses[0] },
      });
    }
  }, [authState.user]);

  return (
    <>
      <Toaster position="bottom-left" toastOptions={toastOption} />
      <Header />
      <AllRoutes />
    </>
  );
}

export default App;
