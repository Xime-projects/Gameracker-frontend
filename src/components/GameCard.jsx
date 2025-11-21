import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { updateGameStatus, createReview, updateReview, removeReview } from "../services/gamesAPI";

export default function GameCard({ game, reload }) {

  const cambiarEstado = async () => {
    const nuevo = game.estado === "pendiente" ? "jugando" : "completado";
    await updateGameStatus(game._id, nuevo);
    reload();
  };

  const addReview = async (review) => {
    await createReview(game._id, review);
    reload();
  };

  const editReview = async (reviewId, texto) => {
    await updateReview(game._id, reviewId, texto);
    reload();
  };

  const deleteReview = async (reviewId) => {
    await removeReview(game._id, reviewId);
    reload();
  };

  return (
    <div className="game-card">
      <img src={game.portada} alt={game.titulo} className="game-img" />

      <h3>{game.titulo}</h3>
      <p>Plataforma: {game.plataforma}</p>
      <p>Estado: {game.estado}</p>

      <button onClick={cambiarEstado}>Cambiar Estado</button>

      <ReviewList
        reseñas={game.reseñas || []}
        onEditReview={editReview}
        onDeleteReview={deleteReview}
      />

      <ReviewForm onSubmit={addReview} />
    </div>
  );
}


  //https://static.thenounproject.com/png/1554489-200.png // Imagen por defecto si no hay portada*/