import React from "react";
import { useNavigate } from "react-router-dom";

export default function Contacts() {
    const navigate = useNavigate();
  
    const handleBackClick = () => {
      navigate("/home");
    };
  
    return (
      <div className="terms-container">
        <h1 className="terms-title">Контакты</h1>
  
        <p className="terms-text">
          Вы можете связаться с нами по следующим каналам. Мы готовы помочь вам с вопросами по работе платформы Step-Up:
        </p>
  
        <h2 className="terms-subtitle">Основные контакты</h2>
        <ul className="terms-list">
          <li>📧 Email: support@step-up.ru</li>
          <li>📞 Телефон: +7 (999) 123-45-67</li>
          <li>📍 Адрес: г. Москва, ул. Образовательная, д. 10</li>
        </ul>
  
        <h2 className="terms-subtitle">Социальные сети</h2>
        <ul className="terms-list">
          <li>🌐 VK: vk.com/stepup_edu</li>
          <li>📷 Instagram: instagram.com/stepup_edu</li>
          <li>💬 Telegram: t.me/stepup_support</li>
        </ul>
  
        <button className="back-button" onClick={handleBackClick}>Назад</button>
      </div>
    );
  };