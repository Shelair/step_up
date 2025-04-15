import psycopg2

# Подключение к БД
conn = psycopg2.connect(
    dbname="your_database_name",
    user="your_username",
    password="your_password",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Удаляем таблицы, если нужно
cur.execute("""
DROP TABLE IF EXISTS email_verification, progress, lessons, course_chapters, courses, users CASCADE;
""")

# Таблица пользователей
cur.execute("""
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""")

# Таблица курсов
cur.execute("""
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    language VARCHAR(100),
    image_url TEXT
);
""")

# Главы курсов
cur.execute("""
CREATE TABLE course_chapters (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255),
    chapter_order INTEGER
);
""")

# Уроки
cur.execute("""
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER REFERENCES course_chapters(id) ON DELETE CASCADE,
    title VARCHAR(255),
    content TEXT,
    video_url TEXT,
    image_url TEXT,
    lesson_order INTEGER
);
""")

# Прогресс пользователя
cur.execute("""
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP
);
""")

# Таблица для верификации почты
cur.execute("""
CREATE TABLE email_verification (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_used BOOLEAN DEFAULT FALSE
);
""")

# Сохраняем и закрываем
conn.commit()
cur.close()
conn.close()
print("Все таблицы успешно созданы.")
