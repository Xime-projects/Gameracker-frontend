import "./GameCard.css";
import { updateGameStatus } from "../services/gamesAPI";

const GameCard = ({ juego }) => {
  const cambiarEstado = async (nuevoEstado) => {
    await updateGameStatus(juego._id, nuevoEstado);
    window.location.reload(); // refrescar lista
  };

  return (
    <div className="game-card">
      <img src={juego.portada}alt={juego.nombre}
  className="game-image"onError={(e) => {e.target.onerror = null; // evita bucle infinito
    e.target.src = "https://static.thenounproject.com/png/1554489-200.png"; // o la URL que quieras
  }}
/>


      <h3>{juego.nombre}</h3>

      <p><strong>Plataforma:</strong> {juego.plataforma}</p>
      <p><strong>Estado:</strong> {juego.estado}</p>
      <p><strong>Horas jugadas:</strong> {juego.horasJugadas}</p>

      {/* 🟩 Botones para cambiar estado */}
      <div className="estado-buttons">
        <button onClick={() => cambiarEstado("Jugando")}>Jugando</button>
        <button onClick={() => cambiarEstado("Pendiente")}>Pendiente</button>
        <button onClick={() => cambiarEstado("Completado")}>Completado</button>
      </div>
    </div>
  );
};

export default GameCard;



