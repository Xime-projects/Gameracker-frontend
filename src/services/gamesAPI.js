const API_URL = "http://localhost:3000/games";

export const getGames = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};