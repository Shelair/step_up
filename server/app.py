from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Включаем CORS для всех маршрутов

# Подключение к базе данных PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",  # Адрес вашего PostgreSQL сервера
        database="courses_db",  # Имя вашей базы данных
        user="postgres",  # Ваш пользователь PostgreSQL
        password="7002"  # Ваш пароль для PostgreSQL
    )
    return conn

# Эндпоинт для получения всех разделов
@app.route('/api/sections', methods=['GET'])
def get_sections():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sections")
    sections = cursor.fetchall()
    cursor.close()
    conn.close()
    
    # Получаем страницы для каждого раздела
    sections_data = []
    for section in sections:
        section_id, title = section
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM pages WHERE section_id = %s", (section_id,))
        pages = cursor.fetchall()
        pages_data = [{'id': page[0], 'title': page[2], 'content': page[3]} for page in pages]
        sections_data.append({'id': section_id, 'title': title, 'pages': pages_data})
        cursor.close()
    
    return jsonify(sections_data)

# Эндпоинт для сохранения данных разделов и страниц
@app.route('/api/saveSections', methods=['POST'])
def save_sections():
    data = request.json
    sections_data = data['sectionsData']
    
    conn = get_db_connection()
    cursor = conn.cursor()

    # Сохраняем разделы
    for section in sections_data:
        section_id = section['id']
        title = section['title']
        if section_id:
            cursor.execute("UPDATE sections SET title = %s WHERE id = %s", (title, section_id))
        else:
            cursor.execute("INSERT INTO sections (title) VALUES (%s) RETURNING id", (title,))
            section_id = cursor.fetchone()[0]

        # Сохраняем страницы для раздела
        for page in section['pages']:
            page_id = page['id']
            page_title = page['title']
            content = page['content']
            if page_id:
                cursor.execute("UPDATE pages SET title = %s, content = %s WHERE id = %s", (page_title, content, page_id))
            else:
                cursor.execute("INSERT INTO pages (section_id, title, content) VALUES (%s, %s, %s)", 
                               (section_id, page_title, content))

    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({'message': 'Данные успешно сохранены!'}), 200

# Запуск сервера
if __name__ == '__main__':
    app.run(debug=True, port=5000)

cursor = conn.cursor()
cursor.execute("SELECT 1")
result = cursor.fetchone()
print("Проверка подключения к базе данных:", result)
