import React from "react";
import { useNavigate } from "react-router-dom";

export default function Help() {

    const navigate = useNavigate();
  
    const handleBackClick = () => {
      navigate("/home");
    };
  
    return (
      <div className="terms-container">
        <h1 className="terms-title">Помощь</h1>
  
        <p className="terms-text">
          Если у вас возникли вопросы при использовании платформы Step-Up, вы можете найти ответы здесь или связаться с нашей поддержкой.
        </p>
  
        <h2 className="terms-subtitle">Часто задаваемые вопросы</h2>
        <ul className="terms-list">
          <li><strong>Как начать обучение?</strong> — Зарегистрируйтесь и выберите курс на главной странице.</li>
          <li><strong>Нужно ли платить за курсы?</strong> — В данный момент все курсы предоставляются бесплатно.</li>
          <li><strong>Можно ли учиться без расписания?</strong> — Да, вы учитесь в удобное для вас время.</li>
          <li><strong>Могу ли я вернуться к пройденному материалу?</strong> — Да, доступ к урокам не ограничен.</li>
        </ul>
  
        <h2 className="terms-subtitle">Связь с поддержкой</h2>
        <p className="terms-text">
          Если вы не нашли ответа на свой вопрос, напишите нам:
        </p>
        <ul className="terms-list">
          <li>📧 Email: support@step-up.ru</li>
          <li>📞 Телефон: +7 (999) 123-45-67</li>
        </ul>
  
        <button className="back-button" onClick={handleBackClick}>Назад</button>
      </div>
    );
  };
  
  