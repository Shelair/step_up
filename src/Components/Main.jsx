import React, { useEffect, useState } from "react";
import Kurs_block from "./Kurs_block";
import axios from "axios";

export default function Main() {
  const [courses, setCourses] = useState([]);

  // ID, которые считаем допустимыми
  const validIds = [6, 7, 8, 9, 10];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        // Фильтруем только те курсы, чей id в списке и у них есть данные
        const filtered = response.data.filter(course =>
          validIds.includes(course.id) &&
          course.title &&
          course.description
        );
        setCourses(filtered);
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
            id={course.id}
            title={course.title}
            description={course.description}
            image={course.image_url}
          />
        ))}
      </div>
    </main>
  );
}
