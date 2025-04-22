import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/account", { withCredentials: true })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Email не найден. Пожалуйста, войдите.");
        } else {
          setErrorMessage("Ошибка при загрузке данных.");
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const handleCreateCourse = () => {
    navigate("/constructor");
  };

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  return (
    <div className="account-container">
      <h1 className="account-title">Информация об аккаунте</h1>
      {userData ? (
        <div className="account-card">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Дата регистрации:</strong> {new Date(userData.created_at).toLocaleString()}</p>
          <div className="account-actions">
            <button onClick={handleCreateCourse} className="account-button">
              Создать курс
            </button>
            <button onClick={handleLogout} className="account-button logout">
              Выйти
            </button>
          </div>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default AccountPage;
