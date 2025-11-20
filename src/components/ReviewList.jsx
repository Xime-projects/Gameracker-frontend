import { useState } from "react";

export default function ReviewList({ reseñas, onEditReview, onDeleteReview }) {
  const [editIndex, setEditIndex] = useState(null);
  const [nuevoTexto, setNuevoTexto] = useState("");

  const startEditing = (index, actualTexto) => {
    setEditIndex(index);
    setNuevoTexto(actualTexto);
  };

  const saveEdit = (index) => {
    onEditReview(index, nuevoTexto);
    setEditIndex(null);
    setNuevoTexto("");
  };

  return (
    <div>
      {reseñas.length === 0 && <p>No hay reseñas todavía.</p>}

      {reseñas.map((r, i) => (
        <div
          key={i}
          style={{
            background: "#f3f3f3",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          {editIndex === i ? (
            <>
              <textarea
                value={nuevoTexto}
                onChange={(e) => setNuevoTexto(e.target.value)}
                style={{ width: "100%", marginBottom: "8px" }}
              />

              <button onClick={() => saveEdit(i)}>Guardar</button>
              <button onClick={() => setEditIndex(null)} style={{ marginLeft: "10px" }}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <p>{r.texto}</p>
              <p style={{ color: "#ff9800" }}>⭐ {r.estrellas}/5</p>

              <button onClick={() => startEditing(i, r.texto)}>Editar</button>
              <button
                onClick={() => onDeleteReview(i)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

