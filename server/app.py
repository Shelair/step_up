from flask import Flask, request, jsonify, session
from flask_cors import CORS
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "your_secret_key"
CORS(app, supports_credentials=True)

# Подключение к PostgreSQL
conn = psycopg2.connect(
    dbname="courses_db",
    user="postgres",
    password="7002",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# 🔐 РЕГИСТРАЦИЯ
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

# 🔓 ЛОГИН
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    cur.execute("SELECT password_hash FROM users WHERE email = %s", (email,))
    user = cur.fetchone()

    if user and check_password_hash(user[0], password):
        session['user'] = email
        return jsonify({"message": "Успешный вход"})
    return jsonify({"message": "Неверный email или пароль"}), 401

# 👤 ДАННЫЕ УЧЕТНОЙ ЗАПИСИ
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

# 🔍 ПРОВЕРКА КУРСА ПО НАЗВАНИЮ
@app.route('/api/courses/check', methods=['GET'])
def check_course():
    title = request.args.get('title')
    if not title:
        return jsonify({"error": "Не указано название"}), 400

    try:
        cur.execute("SELECT id, title FROM courses WHERE title = %s", (title,))
        course = cur.fetchone()
        if course:
            return jsonify({"exists": True, "course": {"id": course[0], "title": course[1]}})
        else:
            return jsonify({"exists": False})
    except Exception as e:
        return jsonify({"error": f"Ошибка проверки: {str(e)}"}), 500

# ➕ ДОБАВЛЕНИЕ НОВОГО КУРСА
@app.route('/api/courses', methods=['POST'])
def create_course():
    data = request.get_json()
    title = data.get('title')

    if not title:
        return jsonify({"error": "Название обязательно"}), 400

    try:
        cur.execute("SELECT id FROM courses WHERE title = %s", (title,))
        if cur.fetchone():
            return jsonify({"error": "Курс с таким названием уже существует"}), 400

        cur.execute("INSERT INTO courses (title) VALUES (%s) RETURNING id", (title,))
        course_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"message": "Курс успешно добавлен", "course_id": course_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Ошибка добавления курса: {str(e)}"}), 500

@app.route('/api/pages', methods=['POST'])
def add_page():
    data = request.get_json()
    course_id = data.get('course_id')
    content = data.get('content')

    try:
        cur.execute("INSERT INTO course_pages (course_id, content) VALUES (%s, %s) RETURNING id", (course_id, content))
        page_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"message": "Страница добавлена", "page_id": page_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/pages/<int:course_id>', methods=['GET'])
def get_pages(course_id):
    try:
        cur.execute("SELECT id, content, created_at FROM course_pages WHERE course_id = %s ORDER BY created_at ASC", (course_id,))
        pages = cur.fetchall()
        result = [{"id": row[0], "content": row[1], "created_at": row[2]} for row in pages]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/pages/<int:id>', methods=['DELETE'])
def delete_page(id):
    try:
        # Ищем страницу по ID
        cur.execute("SELECT id FROM course_pages WHERE id = %s", (id,))
        page = cur.fetchone()

        if not page:
            return jsonify({'error': 'Страница не найдена'}), 404
        
        # Удаляем страницу
        cur.execute("DELETE FROM course_pages WHERE id = %s", (id,))
        conn.commit()
        return jsonify({'message': 'Страница удалена'}), 200
    except Exception as e:
        print(f'Ошибка при удалении страницы: {e}')
        conn.rollback()  # Откатываем изменения в случае ошибки
        return jsonify({'error': 'Ошибка при удалении страницы'}), 500

# ✏️ ОБНОВЛЕНИЕ КУРСА
@app.route('/api/courses/<int:id>', methods=['PUT'])
def update_course(id):
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    image_url = data.get('image_url')

    try:
        cur.execute(
            "UPDATE courses SET title = %s, description = %s, image_url = %s WHERE id = %s",
            (title, description, image_url, id)
        )
        conn.commit()
        return jsonify({"message": "Курс успешно обновлен"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Ошибка обновления курса: {str(e)}"}), 500

@app.route('/api/courses', methods=['GET'])
def get_courses():
    try:
        cur.execute("SELECT id, title, description, image_url FROM courses")
        courses = cur.fetchall()
        result = [
            {"id": row[0], "title": row[1], "description": row[2], "image_url": row[3]}
            for row in courses
        ]
        return jsonify(result)
    except Exception as e:
        print(f"Ошибка получения курсов: {e}")
        return jsonify({"error": "Ошибка сервера"}), 500


# 🔄 ЗАПУСК
if __name__ == "__main__":
    app.run(debug=True)

