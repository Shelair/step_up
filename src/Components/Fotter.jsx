import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-links-row">
          <Link to="/Contacts">Контакты</Link>
          <Link to="/Help">Помощь</Link>
          <Link to="/About">О проекте</Link>
        </div>
        <div className="footer-email">Step_up@gmail.com</div>
      </div>

      <div className="footer-right">
        <p>© 2025 Языковые Курсы. Все права защищены.</p>
        <Link to="/Terms">Пользовательское соглашение</Link>
        <Link to="/Privacy">Политика конфиденциальности</Link>
      </div>
    </footer>
  );
}
