import "./GameCard.css";
import { useState, useEffect } from "react";
import axios from "axios";

import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

export default function GameCard({ game, onEstadoChange }) {
  const [reseñas, setReseñas] = useState([]);

  // ⭐ Traer reseñas desde el backend
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/reviews/${game._id}`)
      .then((res) => setReseñas(res.data))
      .catch((err) => console.error("Error cargando reseñas:", err));
  }, [game._id]);

  // ⭐ Cambiar estado del juego
  const cambiar = () => {
    const nuevo = game.estado === "pendiente" ? "completado" : "pendiente";
    onEstadoChange(game._id, nuevo);
  };

  // ⭐ Guardar reseña en el backend
  const addReseña = async (nuevaReseña) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/reviews",
        nuevaReseña
      );

      // Se añade a la lista sin recargar
      setReseñas([res.data, ...reseñas]);
    } catch (error) {
      console.error("Error guardando reseña:", error);
    }
  };

  return (
    <div className="game-card">
      <img src={game.portada} alt={game.titulo} className="game-img" />

      <h3>{game.titulo}</h3>
      <p>Plataforma: {game.plataforma}</p>
      <p>Estado: {game.estado}</p>

      <button onClick={cambiar}>Cambiar Estado</button>

      <ReviewList reseñas={reseñas} />

      <ReviewForm
        gameId={game._id}
        onSubmit={addReseña}
      />
    </div>
  );
}

  //https://static.thenounproject.com/png/1554489-200.png // Imagen por defecto si no hay portada*/