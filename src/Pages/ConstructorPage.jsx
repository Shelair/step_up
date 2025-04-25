import { useState } from 'react';

export default function CourseConstructor() {
  const [title, setTitle] = useState('');
  const [courseFound, setCourseFound] = useState(null);
  const [courseInfo, setCourseInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [pageText, setPageText] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [pages, setPages] = useState([]);

  const fetchCoursePages = async (courseId) => {
    const res = await fetch(`http://localhost:5000/api/pages/${courseId}`);
    const data = await res.json();
    setPages(data);
  };

  const handleSearchOrAdd = async () => {
    setLoading(true);

    if (courseFound === false) {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Курс добавлен');
        setCourseFound(true);
        setCourseInfo({ id: data.course_id, title });
        fetchCoursePages(data.course_id);
      } else {
        alert(data.error || 'Ошибка при добавлении');
      }
    } else {
      const res = await fetch(`http://localhost:5000/api/courses/check?title=${encodeURIComponent(title)}`);
      const data = await res.json();

      if (data.exists) {
        setCourseFound(true);
        setCourseInfo(data.course);
        fetchCoursePages(data.course.id);
      } else {
        setCourseFound(false);
        setCourseInfo(null);
        setPages([]);
      }
    }

    setLoading(false);
  };

  return (
    <div className="course-container">
      <h2 className="course-heading">Конструктор курсов</h2>
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

          {pages.length > 0 && (
            <div className="existing-pages">
              <h3>Существующие страницы курса:</h3>
              {pages.map((page, index) => (
                <div key={page.id} className="page-block">
                  <strong>Страница {index + 1}</strong>
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
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
