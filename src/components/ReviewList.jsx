export default function ReviewList({ reseñas = [] }) {
  return (
    <div>
      <h3>Reseñas:</h3>

      {reseñas.length === 0 && <p>No hay reseñas todavía.</p>}

      {reseñas.map((r, i) => (
        <div
          key={i}
          style={{
            background: "#eee",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <p>{"⭐".repeat(r.puntuacion)}</p>
          <p>{r.comentario}</p>
          <small>{r.autor}</small>
        </div>
      ))}
    </div>
  );
}
