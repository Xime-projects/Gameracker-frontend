import { useEffect, useState } from "react";
import { getGames } from "../services/gamesAPI";
import GameCard from "../components/GameCard";
import "./Home.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("");
  const [sort, setSort] = useState("nombre");

  // Cargar todos los juegos UNA sola vez
  const loadAllGames = async () => {
    const data = await getGames(); // devuelve solo un array
    setAllGames(data);
  };

  const applyFilters = () => {
    let filtered = [...allGames];

    // FILTRO: búsqueda
    if (search) {
      filtered = filtered.filter((g) =>
        g.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    // FILTRO: estado
    if (estado) {
      filtered = filtered.filter((g) => g.estado === estado);
    }

    // ORDEN
    filtered = filtered.sort((a, b) => {
      if (sort === "horasJugadas") return b.horasJugadas - a.horasJugadas;
      return a[sort].localeCompare(b[sort]);
    });

    // PAGINACIÓN FRONTEND
    const pageSize = 8;
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    setGames(paginated);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  };

  // Cargar datos del backend
  useEffect(() => {
    loadAllGames();
  }, []);

  // Cada vez que cambie filtro u orden
  useEffect(() => {
    applyFilters();
  }, [allGames, page, search, estado, sort]);

  return (
    <div className="home-container">
      <h1>🎮 Biblioteca de Juegos</h1>

      {/* FILTROS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => {
            setPage(1); // reset a página 1
            setSearch(e.target.value);
          }}
        />

        <select
          value={estado}
          onChange={(e) => {
            setPage(1);
            setEstado(e.target.value);
          }}
        >
          <option value="">Todos</option>
          <option value="Jugando">Jugando</option>
          <option value="Completado">Completado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Abandonado">Abandonado</option>
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
        >
          <option value="nombre">Nombre</option>
          <option value="horasJugadas">Horas jugadas</option>
          <option value="estado">Estado</option>
        </select>
      </div>

      {/* LISTA */}
      <div className="game-list">
        {games.map((g) => (
          <GameCard key={g._id} game={g} reload={loadAllGames} />
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
