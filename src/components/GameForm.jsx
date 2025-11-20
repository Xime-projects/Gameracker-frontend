// components/GameForm.jsx
import { useState } from "react";

export default function GameForm() {
  const [form, setForm] = useState({
    titulo: "",
    plataforma: "",
    portada: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, estado: "pendiente" }),
    });

    alert("Juego agregado");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="titulo" placeholder="Título" onChange={handleChange} required />
      <input name="plataforma" placeholder="Plataforma" onChange={handleChange} required />
      <input name="portada" placeholder="URL de portada" onChange={handleChange} required />

      <button type="submit">Guardar</button>
    </form>
  );
}
