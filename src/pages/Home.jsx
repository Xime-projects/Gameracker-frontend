import { useEffect, useState } from "react";
import { getGames } from "../services/gamesAPI";
import GameCard from "../components/GameCard";
import "./Home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Nueva búsqueda
  const [search, setSearch] = useState("");

  // 🟩 Filtro por estado
  const [filterStatus, setFilterStatus] = useState("Todos");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error("Error cargando juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p className="loading">Cargando juegos...</p>;

  // 🔎 Filtrar por búsqueda + estado
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.nombre
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "Todos"
        ? true
        : game.estado.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="home-container">
      <h1>Mis Juegos</h1>

      {/* 🔍 Barra de búsqueda */}
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar juego..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🟩 Botones de filtro */}
      <div className="filter-buttons">
        {["Todos", "Jugando", "Pendiente", "Completado"].map((estado) => (
          <button
            key={estado}
            className={filterStatus === estado ? "active" : ""}
            onClick={() => setFilterStatus(estado)}
          >
            {estado}
          </button>
        ))}
      </div>

      {/* Grid de juegos */}
      <div className="games-grid">
        {filteredGames.map((juego) => (
          <GameCard key={juego._id} juego={juego} />
        ))}
      </div>
    </div>
  );
};

export default Home;

