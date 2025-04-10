import React from "react";

export default function Header() {
  return (
    <div className="header">
        {/* Логотип */}
        <div className="logo">
          <img
            src="\step_up_logo.jpg"
            alt="Логотип"
            width="100"  
            height="100" 
          />
        </div>

        {/* Кнопка Каталог с выпадающим меню */}
        <div className="catalog-menu">
          <button>Каталог</button>
          <div>
            <ul>
              <li >Немецкий</li>
              <li >Корейский</li>
            </ul>
          </div>
        </div>

        {/* Кнопка аккаунта */}
        <button className="account-button">
          Аккаунт
        </button>
    </div>
  );
}