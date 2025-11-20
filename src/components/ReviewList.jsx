// components/ReviewList.jsx
import { useEffect, useState } from "react";

export default function ReviewList({ gameId }) {
  const [reviews, setReviews] = useState([]);

  const load = async () => {
    const res = await fetch(`http://localhost:3000/reviews/${gameId}`);
    setReviews(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h3>Reseñas</h3>
      {reviews.map((r) => (
        <div key={r._id} style={{ marginBottom: "12px" }}>
          <p><strong>{r.autor}:</strong> {r.texto}</p>
        </div>
      ))}
    </div>
  );
}
