import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoursePage() {
  const { courseId } = useParams();
  const [pages, setPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}/pages`);
        if (!res.ok) throw new Error("Не удалось получить страницы");
        const data = await res.json();
        setPages(data);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [courseId]);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, pages.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (loading) return <p>Загрузка...</p>;
  if (!pages.length) return <p>Нет страниц в курсе.</p>;

  return (
    <div className="course-viewer">
      <h2>Страница {currentIndex + 1} из {pages.length}</h2>
      <div className="page-content">
        <p>{pages[currentIndex].content}</p>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrev} disabled={currentIndex === 0}>Назад</button>
        <button onClick={handleNext} disabled={currentIndex === pages.length - 1}>Вперёд</button>
      </div>
    </div>
  );
}
