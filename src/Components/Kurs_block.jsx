import React from "react";
import { useNavigate } from "react-router-dom";

export default function Kurs_block({ id, title, description, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${id}`);
  };

  const getImageSrc = () => {
    if (!image) return "/default.jpg"; // Фолбэк, если нет изображения
    return image.startsWith("http") ? image : `/${image}`;
  };

  return (
    <div className="course-block">
      <div className="course-text">
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={handleClick}>Перейти к курсу</button>
      </div>
      <div className="course-image">
        <img src={getImageSrc()} alt={title || "Курс"} />
      </div>
    </div>
  );
}
