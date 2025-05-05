import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CourseConstructor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [courseFound, setCourseFound] = useState(null);
  const [courseInfo, setCourseInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [pageText, setPageText] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);


  const fetchCoursePages = async (courseId) => {
    const res = await fetch(`http://localhost:5000/api/pages/${courseId}`);
    const data = await res.json();
    setPages(data);
  };

  const fetchCourseInfo = async (title) => {
    const res = await fetch(`http://localhost:5000/api/courses/check?title=${encodeURIComponent(title)}`);
    const data = await res.json();

    if (data.exists) {
      setCourseFound(true);
      setCourseInfo(data.course);
      setDescription(data.course.description || '');
      setImageUrl(data.course.image_url || '');
      fetchCoursePages(data.course.id);
    } else {
      setCourseFound(false);
      setCourseInfo(null);
      setPages([]);
    }
  };

  const handleSearchOrAdd = async () => {
    setLoading(true);

    if (courseFound === false) {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image_url: imageUrl })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Курс добавлен');
        setCourseFound(true);
        setCourseInfo({ id: data.course_id, title, description, image_url: imageUrl });
        fetchCoursePages(data.course_id);
      } else {
        alert(data.error || 'Ошибка при добавлении');
      }
    } else {
      await fetchCourseInfo(title);
    }

    setLoading(false);
  };

  const handleUpdateCourse = async () => {
    if (!courseInfo) return;

    const res = await fetch(`http://localhost:5000/api/courses/${courseInfo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        image_url: imageUrl
      })
    });

    if (res.ok) {
      alert('Курс обновлён');
    } else {
      alert('Ошибка при обновлении курса');
    }
  };

  const navigate = useNavigate();
  return (
    <div className="course-container">
    <button
      onClick={() => navigate('/home')}
      className="back-button"
    >
      Назад
    </button>
      <h2 className="course-heading">Конструктор курсов</h2>

      {/* Блок ввода курса */}
      <div className="course-input-group">
        <input
          type="text"
          className="course-input"
          placeholder="Введите название курса"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setCourseFound(null);
            setCourseInfo(null);
            setPages([]);
          }}
        />
        <button
          onClick={handleSearchOrAdd}
          disabled={!title || loading}
          className="course-button"
        >
          {courseFound === false ? 'Добавить' : 'Поиск'}
        </button>
      </div>

      {courseFound !== null && (
        <div className="course-message">
          {courseFound ? (
            <p className="found">Курс найден: <strong>{courseInfo.title}</strong></p>
          ) : (
            <p className="not-found">Курс не найден. Нажмите "Добавить", чтобы создать.</p>
          )}
        </div>
      )}

      {/* Поля редактирования описания и фото */}
      {courseFound && courseInfo && (
        <div className="course-edit-fields">
          <input
            type="text"
            className="course-input"
            placeholder="Описание курса"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            className="course-input"
            placeholder="Ссылка на картинку курса"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button
            onClick={handleUpdateCourse}
            className="course-button"
          >
            Сохранить изменения
          </button>
        </div>
      )}

      {/* Добавление страниц */}
      {courseFound && courseInfo && (
        <div className="page-editor">
          <button
            onClick={() => {
              setShowTextEditor(true);
              setPageText('');
            }}
            className="course-button"
          >
            Добавить страницу
          </button>

          {showTextEditor && (
            <div className="text-editor-block">
              <textarea
                className="text-editor"
                rows="6"
                placeholder="Введите текст страницы..."
                value={pageText}
                onChange={(e) => setPageText(e.target.value)}
              />
              <button
                onClick={async () => {
                  setSaveLoading(true);
                  const res = await fetch('http://localhost:5000/api/pages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      course_id: courseInfo.id,
                      content: pageText,
                    })
                  });
                  const data = await res.json();
                  setSaveLoading(false);
                  if (res.ok) {
                    alert('Страница добавлена!');
                    setShowTextEditor(false);
                    setPageText('');
                    setPages((prev) => [...prev, data]);
                  } else {
                    alert('Ошибка при сохранении');
                  }
                }}
                className="course-button"
                disabled={saveLoading || !pageText}
              >
                Сохранить страницу
              </button>
            </div>
          )}

          <div className="pages-list">
            <h3>Страницы курса</h3>
            {pages.map((page) => (
              <div key={page.id} className="page-item">
                <p>{page.content}</p>
                <button
                  className="delete-button"
                  onClick={async () => {
                    const confirmDelete = window.confirm('Удалить эту страницу?');
                    if (!confirmDelete) return;

                    const res = await fetch(`http://localhost:5000/api/pages/${page.id}`, {
                      method: 'DELETE'
                    });

                    if (res.ok) {
                      setPages((prev) => prev.filter((p) => p.id !== page.id));
                    } else {
                      alert('Ошибка при удалении');
                    }
                  }}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
