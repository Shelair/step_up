from flask import Flask, request, jsonify, session
from flask_cors import CORS
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Задать секретный ключ
CORS(app, supports_credentials=True)  # ✅ важно для работы с сессиями из браузера

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

    try:
        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            return jsonify({"message": "Пользователь с таким email уже существует"}), 400

        password_hash = generate_password_hash(password)
        cur.execute(
            "INSERT INTO users (email, password_hash) VALUES (%s, %s)",
            (email, password_hash)
        )
        conn.commit()

        return jsonify({"message": "Регистрация прошла успешно"})
    except Exception as e:
        conn.rollback()
        return jsonify({"message": f"Ошибка регистрации: {str(e)}"}), 500


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    cur.execute("SELECT password_hash FROM users WHERE email = %s", (email,))
    user = cur.fetchone()

    if user and check_password_hash(user[0], password):
        session['user'] = email  # ✅ Сохраняем email в сессии
        return jsonify({"message": "Успешный вход"})

    return jsonify({"message": "Неверный email или пароль"}), 401


@app.route('/api/account', methods=["GET"])
def get_account_data():
    email = session.get('user')
    if not email:
        return jsonify({"message": "Вы не вошли в систему"}), 401

    try:
        cur.execute("SELECT email, created_at, role FROM users WHERE email = %s", (email,))
        user_data = cur.fetchone()

        if user_data:
            return jsonify({
                "email": user_data[0],
                "created_at": user_data[1],
                "role": user_data[2]
            })
        else:
            return jsonify({"message": "Пользователь не найден"}), 404
    except Exception as e:
        return jsonify({"message": f"Ошибка: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)

