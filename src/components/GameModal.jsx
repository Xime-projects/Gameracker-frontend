import "./GameModal.css";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default function GameModal({
  game,
  onClose,
  onAddReview,
  onEditReview,
  onDeleteReview,
  onUpdateStatus
}) {
  if (!game) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="close-btn" onClick={onClose}>X</button>

        <h2>{game.titulo}</h2>

        <img
          src={game.portada}
          alt={game.titulo}
          className="modal-img"
        />

        <p><strong>Plataforma:</strong> {game.plataforma}</p>

        <p><strong>Estado actual:</strong> {game.estado}</p>

        <label><strong>Cambiar estado:</strong></label>
        <select
          defaultValue={game.estado}
          onChange={(e) => onUpdateStatus(game._id, e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="jugando">Jugando</option>
          <option value="completado">Completado</option>
        </select>

        <h3>Reseñas</h3>

        <ReviewList
          reseñas={game.reseñas || []}
          onEditReview={onEditReview}
          onDeleteReview={onDeleteReview}
        />

        <ReviewForm
          gameId={game._id}
          onSubmit={onAddReview}
        />
      </div>
    </div>
  );
}

