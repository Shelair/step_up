import React, { useEffect, useState } from "react";
import Kurs_block from "./Kurs_block";
import axios from "axios";

export default function Main() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Фетчим курсы из бэкенда
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error("Ошибка загрузки курсов:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="main-container">
      <h1 className="main-title">Онлайн курсы</h1>
      <div className="courses-wrapper">
        {courses.map(course => (
          <Kurs_block
            key={course.id}
            title={course.title}
            description={course.description}
            image={course.image_url}
            lang={course.title} // Можно использовать title для пути, если нет отдельного поля lang
          />
        ))}
      </div>
    </main>
  );
}
