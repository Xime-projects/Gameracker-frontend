// components/ReviewForm.jsx
import { useState } from "react";

export default function ReviewForm({ gameId }) {
  const [form, setForm] = useState({ autor: "", texto: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, gameId }),
    });

    alert("Reseña agregada");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="autor" placeholder="Tu nombre" onChange={handleChange} required />
      <textarea name="texto" placeholder="Escribe tu reseña" onChange={handleChange} required />

      <button type="submit">Enviar</button>
    </form>
  );
}
