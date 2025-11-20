import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">GameTracker</h2>

      <ul>
        <li><Link to="/">🏠 Inicio</Link></li>
        <li><Link to="/add">➕ Agregar Juego</Link></li>
        <li><Link to="/stats">📊 Estadísticas</Link></li>
      </ul>
    </nav>
  );
}
