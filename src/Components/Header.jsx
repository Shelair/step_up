import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [catalogCourses, setCatalogCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showMyCourses, setShowMyCourses] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowCatalog(false);
        setShowMyCourses(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCatalogCourses = () => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        setCatalogCourses(data);
        setShowCatalog(true);
        setShowMyCourses(false);
      })
      .catch(err => console.error("Ошибка получения курсов:", err));
  };

  const fetchMyCourses = () => {
    fetch("/api/my-courses", {
      credentials: 'include'  // чтобы сессия передавалась
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMyCourses(data);
          setShowMyCourses(true);
          setShowCatalog(false);
        } else {
          alert(data.message || "Ошибка загрузки");
        }
      })
      .catch(err => console.error("Ошибка получения моих курсов:", err));
  };

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
    setShowCatalog(false);
    setShowMyCourses(false);
  };

  return (
    <div className="header">
      <div className="left-section" ref={menuRef}>
        <div className="logo">
          <img src="/step_up_logo.jpg" alt="Логотип" className="logo-img" />
        </div>

        <button className="catalog-button" onClick={fetchCatalogCourses}>Каталог</button>
        <button className="catalog-button" onClick={fetchMyCourses}>Моё обучение</button>

        {showCatalog && (
          <div className="dropdown">
            <ul>
              {catalogCourses.map(course => (
                <li key={course.id} onClick={() => handleCourseClick(course.id)}>
                  {course.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showMyCourses && (
          <div className="dropdown">
            <ul>
              {myCourses.map(course => (
                <li key={course.id} onClick={() => handleCourseClick(course.id)}>
                  {course.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="account-avatar" onClick={() => navigate("/account")} style={{ cursor: "pointer" }}>
        <img
          src="/stanard_photo.png"
          alt="Аккаунт"
          className="avatar-img"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}
