import { useState } from "react";

export default function ReviewForm({ gameId, onSubmit }) {
  const [texto, setTexto] = useState("");
  const [stars, setStars] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    onSubmit({
      juego: gameId,
      comentario: texto,
      puntuacion: stars,
      autor: "Usuario GameTracker",
    });

    setTexto("");
    setStars(5);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
      <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <textarea
        placeholder="Escribe una reseña..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        style={{ width: "100%", padding: "10px", minHeight: "80px" }}
      />

      <button style={{ marginTop: "10px" }}>Publicar</button>
    </form>
  );
}
