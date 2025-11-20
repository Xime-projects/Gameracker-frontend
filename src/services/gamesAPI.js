const API_URL = "http://localhost:3000/games";

export const getGames = async () => {
  const res = await fetch(API_URL);
  return await res.json();  
};

export const updateGameStatus = async (id, estado) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });

  return await res.json();
};
