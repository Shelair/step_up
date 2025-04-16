import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate();

  const handleLanguageSelect = (lang) => {
    navigate(`/courses/${lang.toLowerCase()}`);
    setIsOpen(false);
    setIsOpen2(false);
  };

  const goToAccount = () => {
    navigate("/account");
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

      <button className="create-course-button" onClick={() => navigate("/constructor")}>
          Создать курс
      </button>

      <div className="account-avatar" onClick={goToAccount} style={{ cursor: "pointer" }}>
        <img
          src="\stanard_photo.png" 
          alt="Аккаунт"
          className="avatar-img"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}
