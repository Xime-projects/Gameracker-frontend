import { useState, useEffect } from "react";
import Modal from "react-modal";
import ReviewForm from "./ReviewForm";
import { getReviewsByGame, deleteReview } from "../services/gamesAPI";

Modal.setAppElement("#root");

<button onClick={() => setEditing({})}>➕ Agregar reseña</button>


export default function ReviewList({ gameId }) {
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadReviews = async () => {
    const data = await getReviewsByGame(gameId);
    setReviews(data);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar reseña?")) {
      await deleteReview(id);
      loadReviews();
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div className="review-container">
      <h2>Reseñas</h2>

      {reviews.map((r) => (
        <div key={r._id} className="review-card">
          <p>⭐ {r.puntuacion}</p>
          <p>{r.comentario}</p>
          <p className="author">👤 {r.autor}</p>

          <button onClick={() => setEditing(r)}>✏ Editar</button>
          <button onClick={() => handleDelete(r._id)}>🗑 Eliminar</button>
        </div>
      ))}

      {/* MODAL */}
      <Modal isOpen={!!editing} onRequestClose={() => setEditing(null)}>
        <ReviewForm
          editMode={true}
          gameId={gameId}
          initialData={editing}
          onComplete={() => {
            loadReviews();
            setEditing(null);
          }}
        />
      </Modal>
    </div>
  );
}
