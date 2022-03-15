import axios from "axios";
import "./App.css";

function App() {
  axios.get("/api/products/").then((res) => console.log(res));

  return <div className="App"></div>;
}

export default App;
