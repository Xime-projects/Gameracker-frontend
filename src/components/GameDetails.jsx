// src/components/GameDetails.jsx
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default function GameDetails({ game, onAddReview, onEditReview, onDeleteReview }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>{game.titulo}</h2>

      <img
        src={game.portada}
        alt={game.titulo}
        style={{ width: "220px", borderRadius: "12px", marginBottom: "10px" }}
      />

      <p><strong>Plataforma:</strong> {game.plataforma}</p>
      <p><strong>Estado:</strong> {game.estado}</p>

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
  );
}
