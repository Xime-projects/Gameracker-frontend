
import "./GameCard.css";

export default function GameCard({ game, onEstadoChange, onOpenDetails }) {

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

      <button onClick={cambiar}>Cambiar Estado</button>

      {/* ESTE BOTÓN ES LO QUE ABRE LAS RESEÑAS EN OTRA VISTA */}
      <button
        onClick={() => onOpenDetails(game)}
        style={{ marginTop: "10px" }}
      >
        Ver detalles
      </button>
    </div>
  );
}

  //https://static.thenounproject.com/png/1554489-200.png // Imagen por defecto si no hay portada*/