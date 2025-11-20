
import { useEffect, useState } from "react";
import { getGames, updateGameStatus } from "../services/gamesAPI";
import GameCard from "../components/GameCard";
import "./Home.css";

export default function Home() {
  const [games, setGames] = useState([]);

  const loadGames = async () => {
    const data = await getGames();
    setGames(data);
  };

  const toggleEstado = async (id, estado) => {
    await updateGameStatus(id, estado);
    loadGames();
  };

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <div className="home-container">
      <h1>📚 Mi Biblioteca de Juegos</h1>

      <div className="game-grid">
        {games.map((game) => (
          <GameCard
            key={game._id}
            game={game}
            onEstadoChange={toggleEstado}
          />
        ))}
      </div>
    </div>
  );
}
