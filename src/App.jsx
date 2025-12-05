import Homepage from "./pages/Homepage";
import "./App.css";
import { Routes, Route } from "react-router";

function App() {
  return(
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
