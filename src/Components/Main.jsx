import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Main() {
    const navigate = useNavigate(); // если навигация нужна
    const handleLanguageSelect = (lang) => {
    console.log("Выбран язык:", lang);
    navigate(`/courses/${lang.toLowerCase()}`);
    }; // пример перехода
  return (
<main>
        <div>
          {/* Курс Немецкого */}
          <div>
            <h2>Курс немецкого языка</h2>
            <p>Изучи немецкий от уровня A1 до B2 с опытными преподавателями.</p>
            <button onClick={() => handleLanguageSelect("Немецкий")}>Перейти к курсу</button>
          </div>

          {/* Курс Корейского */}
          <div>
            <h2>Курс корейского языка</h2>
            <p>Погрузись в мир корейского языка и культуры с нами!</p>
            <button onClick={() => handleLanguageSelect("Корейский")}>Перейти к курсу</button>
          </div>
        </div>
      </main>
);
}