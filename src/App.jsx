import React from "react";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/games";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJuegos = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status} - ${res.statusText} - ${text}`);
        }
        const data = await res.json();
        // Manejo por si el backend devuelve { data: [...] } o solo [...]
        const lista = Array.isArray(data) ? data : data.data ?? [];
        console.log("Juegos recibidos:", lista);
        setJuegos(lista);
      } catch (err) {
        console.error("Error al cargar juegos:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchJuegos();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: 32 }}>Game Tracker</h1>

      {loading && <p style={{ textAlign: "center" }}>Cargando...</p>}
      {error && (
        <p style={{ color: "crimson", textAlign: "center" }}>
          Error: {error}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {juegos.length > 0 ? (
          juegos.map((juego) => (
            <div
              key={juego._id}
              style={{
                background: "#ffffffff",
                borderRadius: 12,
                padding: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                border: "1px solid #e6e6e6",
              }}
            >
              <div style={{ width: "100%", height: 140, overflow: "hidden", borderRadius: 8 }}>
                <img
                  src={juego.portada}
                  alt={juego.nombre}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
                  }}
                />
              </div>

              <h2 style={{ marginTop: 10, marginBottom: 6 }}>{juego.nombre}</h2>

              <p style={{ margin: 0 }}>
                <strong>Plataforma:</strong> {juego.plataforma ?? "—"}
              </p>

              <p style={{ margin: "6px 0 0 0" }}>
                <strong>Estado:</strong> {juego.estado ?? "—"}
              </p>

              <p style={{ margin: "6px 0 0 0" }}>
                <strong>Horas jugadas:</strong> {juego.horasJugadas ?? 0}
              </p>
            </div>
          ))
        ) : (
          !loading &&
          !error && (
            <p style={{ textAlign: "center", gridColumn: "1/-1" }}>
              No hay juegos registrados aún 😢
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default App;

