import React from "react";
import { useNavigate } from "react-router-dom";

export default function Kurs_block({ title, description, image, lang }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${lang.toLowerCase()}`);
  };

  return (
    <div className="course-block">
      <div className="course-text">
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={handleClick}>Перейти к курсу</button>
      </div>
      <div className="course-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
}
