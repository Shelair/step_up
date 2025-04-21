import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isRegister && password !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    try {
      const url = isRegister ? "http://localhost:5000/register" : "http://localhost:5000/login";
      const response = await axios.post(url, {
        email,
        password,
      });

      setMessage(response.data.message);

      if (!isRegister) {
        navigate("/home");
      }

    } catch (err) {
      setMessage(err.response?.data?.message || "Произошла ошибка");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isRegister ? "active" : ""}`}
            onClick={() => setIsRegister(true)}
          >
            Регистрация
          </button>
          <button
            className={`toggle-btn ${!isRegister ? "active" : ""}`}
            onClick={() => setIsRegister(false)}
          >
            Вход
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-fields">
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isRegister && (
            <input
              type="password"
              placeholder="Подтвердите пароль"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" className="auth-btn">
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
