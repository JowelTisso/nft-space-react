import "./App.css";
import Header from "./components/header/Header";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  const toastOption = {
    className: "alert",
    duration: 1500,
    style: {
      fontWeight: 100,
    },
  };

  return (
    <>
      <Toaster position="bottom-left" toastOptions={toastOption} />
      <Header />
      <AllRoutes />
    </>
  );
}

export default App;
