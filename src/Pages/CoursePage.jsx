// src/pages/CoursePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoursePage() {
  const { courseId } = useParams();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${courseId}/first_page`)
      .then(res => res.json())
      .then(data => setPageData(data))
      .catch(err => console.error("Ошибка загрузки:", err));
  }, [courseId]);

  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="course-content">
      <h2>Страница {pageData.position}</h2>
      <div className="page-content">{pageData.content}</div>
    </div>
  );
}
