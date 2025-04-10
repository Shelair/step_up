import React from "react";
import Header from "../Components/Header";

export default function HomePage() {
  return (
    <div>
        <Header/>
      <main>
        <div>
          {/* Курс Немецкого */}
          <div>
            <h2>Курс немецкого языка</h2>
            <p>Изучи немецкий от уровня A1 до B2 с опытными преподавателями.</p>
            <button>
              Перейти к курсу
            </button>
          </div>

          {/* Курс Корейского */}
          <div>
            <h2>Курс корейского языка</h2>
            <p>Погрузись в мир корейского языка и культуры с нами!</p>
            <button>
              Перейти к курсу
            </button>
          </div>
        </div>
      </main>

      {/* Подвал */}
      <footer className="footer">
        © 2025 Языковые Курсы. Все права защищены.
      </footer>
    </div>
  );
}