import React from "react";
import "./StarRating.css";

export default function StarRating({ value = 0, onChange }) {
  const handleClick = (newVal) => {
    if (onChange) onChange(newVal);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={n <= value ? "star filled" : "star"}
          onClick={() => handleClick(n)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
// Estrellas interactivas para calificaciones
