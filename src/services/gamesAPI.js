const API_URL = "http://localhost:3000/games";

// ---------------- GAM ES -------------------

export const getGames = async (page = 1, limit = 8, sort = "nombre", search = "", estado = "") => {
  const url = `${API_URL}?page=${page}&limit=${limit}&sort=${sort}&search=${search}&estado=${estado}`;
  const res = await fetch(url);
  return await res.json();
};

export const createGame = async (gameData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameData)
  });
  return await res.json();
};

export const updateGame = async (id, gameData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameData)
  });
  return await res.json();
};

export const updateGameStatus = async (id, estado) => {
  const res = await fetch(`${API_URL}/${id}/estado`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado })
  });
  return await res.json();
};

export const deleteGame = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return await res.json();
};


// ---------------- REVIEWS -------------------
const REVIEW_URL = "http://localhost:3000/api/Reviews";


// Obtener todas las reviews
export const getReviews = async () => {
  const res = await fetch(REVIEW_URL);
  if (!res.ok) throw new Error('Error al obtener las reseñas');
  return await res.json();
};

// Obtener reviews por id de juego
export const getReviewsByGame = async (gameId) => {
  const res = await fetch(`${REVIEW_URL}?juego=${gameId}`);
  if (!res.ok) throw new Error('Error al obtener las reseñas del juego');
  return await res.json();
};

// Crear una review
export const createReview = async (reviewData) => {
  const res = await fetch(REVIEW_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) throw new Error('Error al crear la reseña');
  return await res.json();
};

// Actualizar una review
export const updateReview = async (id, updatedData) => {
  const res = await fetch(`${REVIEW_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Error al actualizar la reseña');
  return await res.json();
};

// Eliminar una review
export const deleteReview = async (id) => {
  const res = await fetch(`${REVIEW_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error('Error al eliminar la reseña');
  return await res.json();
};

