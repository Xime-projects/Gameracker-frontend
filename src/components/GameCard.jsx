// src/components/GameCard.jsx
import "./GameCard.css";

const GameCard = ({ juego }) => {
  return (
    <div className="game-card">
      <img src={juego.portada} alt={juego.nombre} className="game-image" />

      <h3>{juego.nombre}</h3>

      <p><strong>Plataforma:</strong> {juego.plataforma}</p>
      <p><strong>Estado:</strong> {juego.estado}</p>
      <p><strong>Horas jugadas:</strong> {juego.horasJugadas}</p>
    </div>
  );
};

export default GameCard;

