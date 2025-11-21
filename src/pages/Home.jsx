import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import GameModal from "../components/GameModal";
import { getGames } from "../services/gamesAPI";

const Home = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const fetchData = async () => {
    const data = await getGames();
    setGames(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>Biblioteca de Juegos</h1>

      <div className="games-grid">
        {games.map((game) => (
          <GameCard
            key={game._id}
            game={game}
            onSelect={() => setSelectedGame(game)}
          />
        ))}
      </div>

      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          refresh={fetchData}
        />
      )}
    </div>
  );
};

export default Home;
