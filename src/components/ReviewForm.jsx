// src/components/ReviewForm.jsx
import { useState } from "react";

export default function ReviewForm({ gameId, onSubmit }) {
  const [texto, setTexto] = useState("");
  const [estrellas, setEstrellas] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    onSubmit({ texto, estrellas, gameId });

    setTexto("");
    setEstrellas(0);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
      <textarea
        placeholder="Escribe una reseña..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        style={{ width: "100%", padding: "10px", minHeight: "80px" }}
      />

      <div style={{ margin: "10px 0" }}>
        <strong>Calificación:</strong>
        <div>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setEstrellas(n)}
              style={{
                cursor: "pointer",
                fontSize: "25px",
                color: n <= estrellas ? "#ff9800" : "#ccc",
                marginRight: "5px",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <button style={{ marginTop: "10px" }}>Publicar</button>
    </form>
  );
}

