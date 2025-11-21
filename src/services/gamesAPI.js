const API_URL = "http://localhost:3000/games";

// Obtener juegos con paginación + filtros + orden
export const getGames = async (page = 1, limit = 8, sort = "nombre", search = "", estado = "") => {
  const url = `${API_URL}?page=${page}&limit=${limit}&sort=${sort}&search=${search}&estado=${estado}`;

  const res = await fetch(url);
  return await res.json(); // <-- debe devolver: { games: [], totalPages: X }
};

// Crear un juego
export const createGame = async (gameData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameData)
  });
  return await res.json();
};

// Editar juego
export const updateGame = async (id, gameData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameData)
  });
  return await res.json();
};

// Cambiar solo el estado
export const updateGameStatus = async (id, estado) => {
  const res = await fetch(`${API_URL}/${id}/estado`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado })
  });
  return await res.json();
};

// Eliminar juego
export const deleteGame = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return await res.json();
};

/* ---------------------- RESEÑAS -------------------------- */

export const getReviewsByGame = async (gameId) => {
  const res = await fetch(`${API_URL}/${gameId}/reviews`);
  return await res.json();
};

export const createReview = async (gameId, reviewData) => {
  const res = await fetch(`${API_URL}/${gameId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData)
  });
  return await res.json();
};

export const updateReview = async (reviewId, reviewData) => {
  const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData)
  });
  return await res.json();
};

export const deleteReview = async (reviewId) => {
  const res = await fetch(`${API_URL}/reviews/${reviewId}`, { method: "DELETE" });
  return await res.json();
};
