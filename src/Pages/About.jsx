import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
  
    const handleBackClick = () => {
      navigate("/home");
    };
  
    return (
      <div className="terms-container">
        <h1 className="terms-title">О проекте Step-Up</h1>
  
        <p className="terms-text">
          Step-Up — это онлайн-платформа для самостоятельного обучения. Мы предоставляем курсы по различным темам,
          которые можно проходить в удобном для вас темпе, без привязки к расписанию.
        </p>
  
        <h2 className="terms-subtitle">Наша цель</h2>
        <p className="terms-text">
          Мы стремимся сделать качественное образование доступным для всех, независимо от места жительства,
          графика или уровня подготовки. Step-Up создан для того, чтобы вы могли учиться, когда вам удобно.
        </p>
  
        <h2 className="terms-subtitle">Как это работает</h2>
        <ul className="terms-list">
          <li>✔ Зарегистрируйтесь на платформе</li>
          <li>✔ Выберите курс по интересующей теме</li>
          <li>✔ Проходите уроки в своем ритме</li>
          <li>✔ Получайте знания и применяйте их на практике</li>
        </ul>
  
        <h2 className="terms-subtitle">Преимущества Step-Up</h2>
        <ul className="terms-list">
          <li>📚 Удобный формат обучения</li>
          <li>💡 Курсы, созданные экспертами</li>
          <li>⏱ Полная свобода в выборе времени</li>
          <li>🚀 Постоянное обновление контента</li>
        </ul>
  
        <button className="back-button" onClick={handleBackClick}>Назад</button>
      </div>
    );
  };
