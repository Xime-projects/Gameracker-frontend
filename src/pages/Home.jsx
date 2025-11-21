import { useEffect, useState } from "react";
import { getGames } from "../services/gamesAPI";
import GameCard from "../components/GameCard";
import "./Home.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("");
  const [sort, setSort] = useState("nombre");

  const fetchGames = async () => {
    const data = await getGames(page, 8, sort, search, estado);

    setGames(data.games);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchGames();
  }, [page, search, estado, sort]);

  return (
    <div className="home-container">
      <h1>🎮 Biblioteca de Juegos</h1>

      {/* FILTROS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Todos</option>
          <option value="Jugando">Jugando</option>
          <option value="Completado">Completado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Abandonado">Abandonado</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="horasJugadas">Horas jugadas</option>
          <option value="estado">Estado</option>
        </select>
      </div>

      {/* LISTA */}
      <div className="game-list">
        {games.map((g) => (
          <GameCard key={g._id} game={g} reload={fetchGames} />
        ))}
      </div>

      {/* PAGINACIÓN */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅ Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}

