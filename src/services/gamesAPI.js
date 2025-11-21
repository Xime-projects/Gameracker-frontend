const API_URL = "http://localhost:3000/api/games";

/* -------------------- JUEGOS -------------------- */

// Obtener todos los juegos
export const getGames = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// Obtener un juego por ID (para editar)
export const getGameById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

// Crear juego
export const createGame = async (game) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  return res.json();
};

// Editar juego
export const updateGame = async (id, game) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  return res.json();
};

// Eliminar juego
export const deleteGame = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

/* -------------------- RESEÑAS -------------------- */

export const addReview = async (gameId, review) => {
  const res = await fetch(`${API_URL}/${gameId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  return res.json();
};

export const editReview = async (gameId, reviewId, review) => {
  const res = await fetch(`${API_URL}/${gameId}/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  return res.json();
};

export const deleteReview = async (gameId, reviewId) => {
  const res = await fetch(`${API_URL}/${gameId}/reviews/${reviewId}`, {
    method: "DELETE",
  });
  return res.json();
};
