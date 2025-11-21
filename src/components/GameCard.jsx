import { useState } from "react";
import Modal from "react-modal";
import GameForm from "./GameForm";
import { deleteGame } from "../services/gamesAPI";
import "./GameCard.css";

Modal.setAppElement("#root");

export default function GameCard({ game, reload }) {
  const [open, setOpen] = useState(false);

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
        <button onClick={() => setOpen(true)}>✏ Editar</button>
        <button onClick={handleDelete} className="delete">
          🗑 Eliminar
        </button>
      </div>

      {/* MODAL */}
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <GameForm
          editMode={true}
          initialData={game}
          onComplete={() => {
            reload();
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

  //https://static.thenounproject.com/png/1554489-200.png // Imagen por defecto si no hay portada*/