import Homepage from "./pages/Homepage";
import Modal from "./pages/Modal/Modal";
import "./App.css";
import { Routes, Route } from "react-router";

function App() {
  return(
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="" element={<Modal />} />
    </Routes>
  );
}

export default App;
