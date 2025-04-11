import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // если используешь React Router

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate(); // если навигация нужна

  const handleLanguageSelect = (lang) => {
    // Пример навигации или логики
    console.log("Выбран язык:", lang);
    navigate(`/courses/${lang.toLowerCase()}`); // пример перехода
    setIsOpen(false); // закрываем меню
  };

  return (
    <div className="header">
      <div className="left-section">
        <div className="logo">
          <img src="\step_up_logo.jpg" alt="Логотип" className="logo-img" />
        </div>

        <div className="catalog-menu">
          <button onClick={() => setIsOpen(!isOpen)} className="catalog-button">
            Каталог
          </button>
          {isOpen && (
            <div className="dropdown">
              <ul>
                <li onClick={() => handleLanguageSelect("Немецкий")}>Немецкий</li>
                <li onClick={() => handleLanguageSelect("Корейский")}>Корейский</li>
              </ul>
            </div>
          )}
        </div>

    <div className="catalog-menu">
          <button onClick={() => setIsOpen2(!isOpen2)} className="catalog-button">
            Мое обучение
          </button>
          {isOpen2 && (
            <div className="dropdown">
              <ul>
                <li onClick={() => handleLanguageSelect("Немецкий")}>Немецкий</li>
                <li onClick={() => handleLanguageSelect("Корейский")}>Корейский</li>
              </ul>
            </div>
          )}
        </div>

    
  </div>
      <button className="account-button">Аккаунт</button>
    </div>
  );
}
