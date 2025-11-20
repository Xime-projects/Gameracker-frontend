// components/GameCard.jsx
import "./GameCard.css";

export default function GameCard({ game, onEstadoChange }) {
  const cambiar = () => {
    const nuevo = game.estado === "pendiente" ? "completado" : "pendiente";
    onEstadoChange(game._id, nuevo);
  };

  return (
    <div className="game-card">
      <img src={game.portada} alt={game.titulo} className="game-img" />

      <h3>{game.titulo}</h3>

      <p>Plataforma: {game.plataforma}</p>
      <p>Estado: {game.estado}</p>

      <button onClick={cambiar}>
        Cambiar Estado
      </button>
    </div>
  );
}

/*<div className="estado-buttons">
        <button onClick={() => cambiarEstado("Jugando")}>Jugando</button>
        <button onClick={() => cambiarEstado("Pendiente")}>Pendiente</button>
        <button onClick={() => cambiarEstado("Completado")}>Completado</button>
      </div>
    </div>



  //https://static.thenounproject.com/png/1554489-200.png // Imagen por defecto si no hay portada*/