
import { useEffect, useState } from "react";
import { getGames } from "../services/gamesAPI";
import GameCard from "../components/GameCard";
import "./Home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="home-container">
      <h1>Mis Juegos</h1>
      <div className="games-grid">
        {games.map((juego) => (
          <GameCard key={juego._id} juego={juego} />
        ))}
      </div>
    </div>
  );
};

export default Home;

