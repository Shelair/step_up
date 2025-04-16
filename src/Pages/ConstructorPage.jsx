import React, { useState } from "react";
import PageConstructor from "../Components/PageConstructor"; // Импортируем компонент для страницы

export default function ConstructorPage() {
  const [sections, setSections] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: "Новый раздел",
      pages: [],
    };
    setSections([...sections, newSection]);
  };

  const addPage = (sectionId) => {
    const newPage = {
      id: Date.now(),
      title: "Новая страница",
      content: "",
      elements: [], // Массив для элементов
    };
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? { ...section, pages: [...section.pages, newPage] }
        : section
    );
    setSections(updatedSections);
  };

  const handleSavePage = (pageId, updatedPage) => {
    const updatedSections = sections.map((section) => {
      const updatedPages = section.pages.map((page) =>
        page.id === pageId ? updatedPage : page
      );
      return { ...section, pages: updatedPages };
    });
    setSections(updatedSections);
  };

  return (
    <div>
      <h1>Конструктор курса</h1>
      <div className="sidebar">
        <button onClick={addSection}>+ Добавить раздел</button>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <strong>{section.title}</strong>
              <button onClick={() => addPage(section.id)}>+ Добавить страницу</button>
              <ul>
                {section.pages.map((page) => (
                  <li key={page.id} onClick={() => setSelectedPage(page)}>
                    {page.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="workspace">
        {selectedPage && (
          <PageConstructor page={selectedPage} savePage={handleSavePage} />
        )}
      </div>
    </div>
  );
}
