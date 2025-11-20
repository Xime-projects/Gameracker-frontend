import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddGame from "./pages/AddGame";
import Estadisticas from "./pages/Estadisticas";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddGame />} />
        <Route path="/stats" element={<Estadisticas />} />
      </Routes>
    </BrowserRouter>
  );
}



