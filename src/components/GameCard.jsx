import { useState } from "react";
import Modal from "react-modal";
import GameForm from "./GameForm";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";   
import { deleteGame } from "../services/gamesAPI";
import "./GameCard.css";

Modal.setAppElement("#root");

export default function GameCard({ game, reload }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  const handleDelete = async () => {
    if (confirm("¿Eliminar este juego?")) {
      await deleteGame(game._id);
      reload();
    }
  };

  return (
    <div className="game-card">
      <img src={game.portada} alt={game.nombre} />

      <h3>{game.nombre}</h3>
      <p>🎮 {game.plataforma}</p>
      <p>📊 Estado: {game.estado}</p>
      <p>⏳ Horas: {game.horasJugadas}</p>

      <div className="buttons">
        <button onClick={() => setOpenEdit(true)}>✏ Editar</button>
        <button onClick={handleDelete} className="delete">🗑 Eliminar</button>
        <button onClick={() => setOpenReviews(true)} className="reviews-btn">
          ✨ Reseñas
        </button>
      </div>

      {/* MODAL — EDITAR JUEGO */}
      <Modal isOpen={openEdit} onRequestClose={() => setOpenEdit(false)}>
        <GameForm
          editMode={true}
          initialData={game}
          onComplete={() => {
            reload();
            setOpenEdit(false);
          }}
        />
      </Modal>

      {/* MODAL — RESEÑAS */}
      <Modal isOpen={openReviews} onRequestClose={() => setOpenReviews(false)}>

        <h2>Reseñas de {game.nombre}</h2>

        {/* ⭐ Promedio + Contador */}
        <ReviewList gameId={game._id} />

        <hr />

        {/* Formulario para crear reseña */}
        <ReviewForm
          gameId={game._id}
          onComplete={() => {
            reload();
          }}
        />
      </Modal>
    </div>
  );
}



  //https://static.thenounproject.com/png/1554489-200.png // Imagen por defecto si no hay portada*/