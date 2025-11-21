import React, { useState, useEffect } from "react";
import { createReview, updateReview } from "../services/gamesAPI";
import StarRating from "./StarRating";

export default function ReviewForm({ initialData = null, gameId = null, onComplete }) {
  const [puntuacion, setPuntuacion] = useState(5);
  const [comentario, setComentario] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setPuntuacion(initialData.puntuacion || 5);
      setComentario(initialData.comentario || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) return alert("El comentario no puede estar vacío");

    const payload = { puntuacion, comentario, autor: (initialData && initialData.autor) || "Usuario GameTracker" };
    setSaving(true);
    try {
      if (initialData && initialData._id) {
        await updateReview(initialData._id, payload);
      } else {
        // Si no viene initialData, creamos reseña ligada a gameId
        await createReview({ ...payload, juego: gameId });
      }
      onComplete && onComplete();
    } catch (err) {
      console.error(err);
      alert("Error guardando reseña");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <label>
        Calificación
        <StarRating value={puntuacion} onChange={setPuntuacion} />
      </label>

      <label>
        Comentario
        <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} rows={4} />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn" disabled={saving}>{saving ? 'Guardando...' : 'Enviar'}</button>
        <button type="button" className="btn btn-danger" onClick={() => onComplete && onComplete(false)}>Cancelar</button>
      </div>
    </form>
  );
}