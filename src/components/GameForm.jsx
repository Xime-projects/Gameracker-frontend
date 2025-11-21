import React, { useState, useEffect } from "react";
import { createGame, updateGame } from "../services/gamesAPI";

export default function GameForm({ initialData = null, onComplete }) {
  const [nombre, setNombre] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [portada, setPortada] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [horasJugadas, setHorasJugadas] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
      setPlataforma(initialData.plataforma || "");
      setPortada(initialData.portada || "");
      setEstado(initialData.estado || "Pendiente");
      setHorasJugadas(initialData.horasJugadas ?? 0);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !plataforma.trim()) return alert("Nombre y plataforma obligatorios");

    const payload = { nombre, plataforma, portada, estado, horasJugadas: Number(horasJugadas) };
    setSaving(true);
    try {
      if (initialData && initialData._id) {
        await updateGame(initialData._id, payload);
      } else {
        await createGame(payload);
      }
      onComplete && onComplete();
    } catch (err) {
      console.error(err);
      alert("Error guardando el juego");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <label>
        Nombre
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>

      <label>
        Plataforma
        <input value={plataforma} onChange={(e) => setPlataforma(e.target.value)} />
      </label>

      <label>
        Portada (URL)
        <input value={portada} onChange={(e) => setPortada(e.target.value)} />
      </label>

      <label>
        Estado
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option>Jugando</option>
          <option>Completado</option>
          <option>Pendiente</option>
          <option>Abandonado</option>
        </select>
      </label>

      <label>
        Horas jugadas
        <input type="number" min="0" value={horasJugadas} onChange={(e) => setHorasJugadas(e.target.value)} />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        <button type="button" className="btn btn-danger" onClick={() => onComplete && onComplete(false)}>Cancelar</button>
      </div>
    </form>
  );
}