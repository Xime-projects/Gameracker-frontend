// pages/Estadisticas.jsx
import { useEffect, useState } from "react";
import { getGames } from "../services/gamesAPI";

export default function Estadisticas() {
  const [stats, setStats] = useState({ total: 0, completados: 0 });

  const loadStats = async () => {
    const data = await getGames();
    const total = data.length;
    const completados = data.filter(g => g.estado === "completado").length;

    setStats({ total, completados });
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Estadísticas Personales</h1>

      <p>Total de juegos: <strong>{stats.total}</strong></p>
      <p>Juegos completados: <strong>{stats.completados}</strong></p>
    </div>
  );
}
