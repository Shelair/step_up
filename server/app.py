from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Подключение к базе данных PostgreSQL
conn = psycopg2.connect(
    dbname="courses_db",
    user="postgres",
    password="7002",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Проверка существования пользователя
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    if cur.fetchone():
        return jsonify({"message": "Пользователь уже существует"}), 409

    # Хеширование пароля
    hashed_pw = generate_password_hash(password)
    cur.execute("INSERT INTO users (email, password_hash) VALUES (%s, %s)", (email, hashed_pw))
    conn.commit()
    return jsonify({"message": "Регистрация прошла успешно"})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Проверка пользователя в базе данных
    cur.execute("SELECT password_hash FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    if user and check_password_hash(user[0], password):
        return jsonify({"message": "Успешный вход"})
    return jsonify({"message": "Неверный email или пароль"}), 401

# API для получения данных пользователя
@app.route('/api/account/<email>', methods=["GET"])
def get_account_data(email):
    try:
        # Запрос к базе данных для получения информации о пользователе
        cur.execute("""
            SELECT email, created_at 
            FROM users 
            WHERE email = %s
        """, (email,))
        
        user_data = cur.fetchone()
        
        if user_data:
            return jsonify({
                "email": user_data[0],
                "created_at": user_data[1]
            })
        else:
            return jsonify({"message": "Данные не найдены для пользователя"}), 404
    except Exception as e:
        return jsonify({"message": f"Ошибка при получении данных: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
