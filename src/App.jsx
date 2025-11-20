// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddGame from "./pages/AddGame";
import Statistics from "./pages/Statistics.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddGame />} />
        <Route path="/stats" element={<Statistics/>} />
      </Routes>
    </BrowserRouter>
  );
}


