// src/pages/CoursePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Components/Header";

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

  const handleSelectPage = (index) => {
    setCurrentIndex(index);
  };

  if (loading) return <div>Загрузка...</div>;
  if (!pages.length) return <div>Нет страниц для этого курса</div>;

  const currentPage = pages[currentIndex];

  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  // Преобразует YouTube ссылку в формат для iframe
  const transformYouTubeURL = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url; // оставим как есть для других видео-ссылок
  };
  

  return (
    <>
      <Header />
      <div style={{ display: "flex", height: "100vh", backgroundColor: "#fff" }}>
        {/* Левый сайдбар */}
        <div style={{ width: "200px", backgroundColor: "#1c1c1c", color: "#fff", padding: "1rem" }}>
          {pages.map((page, index) => (
            <div
              key={index}
              onClick={() => handleSelectPage(index)}
              style={{
                padding: "0.5rem",
                marginBottom: "0.5rem",
                cursor: "pointer",
                backgroundColor: currentIndex === index ? "#ffd97d" : "transparent",
                color: currentIndex === index ? "#000" : "#fff",
                borderRadius: "4px",
                fontWeight: currentIndex === index ? "bold" : "normal"
              }}
            >
              Страница{index + 1}
            </div>
          ))}

          <button
            onClick={handleExit}
            style={{
              marginTop: "2rem",
              width: "100%",
              padding: "0.6rem",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            ВЫЙТИ
          </button>
        </div>

        {/* Основной контент */}
        <div style={{ flex: 1, padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div
            style={{
              backgroundColor: "#7e5e60",
              color: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              width: "700px",
              height: "300px", // фиксированная высота
              overflowY: "auto", // добавит прокрутку, если текст слишком длинный
              textAlign: "left",
              fontSize: "16px",
              fontFamily: "sans-serif",
              boxSizing: "border-box"
            }}
          >
            {
  isValidURL(currentPage.content) ? (
    <iframe
      src={transformYouTubeURL(currentPage.content)}
      title="Video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ width: "100%", height: "100%", borderRadius: "12px" }}
    ></iframe>
  ) : (
    <div style={{ whiteSpace: "pre-wrap" }}>{currentPage.content}</div>
  )
}

          </div>


          <div style={{ display: "flex", justifyContent: "space-between", width: "60%", marginTop: "2rem" }}>
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              style={{
                padding: "0.8rem 2rem",
                backgroundColor: "#a7938e",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer"
              }}
            >
              НАЗАД
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === pages.length - 1}
              style={{
                padding: "0.8rem 2rem",
                backgroundColor: "#a7938e",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: currentIndex === pages.length - 1 ? "not-allowed" : "pointer"
              }}
            >
              ДАЛЬШЕ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
