// src/pages/CoursePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/pages/${courseId}`)
      .then(res => res.json())
      .then(data => {
        setPages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки страниц:", err);
        setLoading(false);
      });
  }, [courseId]);

  const goToPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const goToNext = () => {
    if (currentIndex < pages.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handleExit = () => {
    navigate("/home");
  };

  if (loading) return <div>Загрузка...</div>;
  if (!pages.length) return <div>Нет страниц для этого курса</div>;

  const currentPage = pages[currentIndex];

  return (
    <div className="course-content">
      <h2>Страница {currentIndex + 1}</h2>
      <div className="page-content">{currentPage.content}</div>

      <div className="navigation-buttons">
        <button onClick={goToPrevious} disabled={currentIndex === 0}>Назад</button>
        <button onClick={goToNext} disabled={currentIndex === pages.length - 1}>Вперёд</button>
      </div>

      <div className="exit-button" style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handleExit} style={{
          padding: "0.5rem 1rem",
          background: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Выйти
        </button>
      </div>
    </div>
  );
}
