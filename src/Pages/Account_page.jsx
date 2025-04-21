import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Используем useNavigate вместо useHistory

  // Получаем email пользователя из localStorage (или другого места, где вы храните данные)
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) {
      setErrorMessage("Email не найден. Пожалуйста, войдите.");
      return;
    }

    // Запрашиваем данные пользователя с сервера
    axios
      .get(`http://localhost:5000/api/account/${email}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        setErrorMessage("Ошибка при загрузке данных.");
      });
  }, [email]);

  const handleBackToHome = () => {
    navigate("/home"); // Используем navigate для перехода на главную
  };

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  return (
    <div className="account-container">
      <h1 className="account-title">Информация о аккаунте</h1>
      {userData ? (
        <div className="account-card">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Дата регистрации:</strong> {new Date(userData.created_at).toLocaleString()}</p>
          <button
            onClick={handleBackToHome}
            className="account-button"
          >
            Вернуться на главную
          </button>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default AccountPage;
