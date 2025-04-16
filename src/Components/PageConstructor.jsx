import React, { useState } from "react";

export default function PageConstructor({ page, savePage }) {
  const [elements, setElements] = useState(page.elements || []);
  const [newElementType, setNewElementType] = useState("text");
  const [newElementContent, setNewElementContent] = useState("");
  const [newQuestionOptions, setNewQuestionOptions] = useState(["", "", ""]);

  const handleAddElement = () => {
    let newElement = {};
    if (newElementType === "text") {
      newElement = { type: "text", content: newElementContent };
    } else if (newElementType === "video") {
      newElement = { type: "video", url: newElementContent };
    } else if (newElementType === "question") {
      newElement = {
        type: "question",
        questionText: newElementContent,
        options: newQuestionOptions.map((option, index) => ({
          text: option,
          isCorrect: index === 0, // Допустим, первый вариант всегда правильный
        })),
      };
    }
    setElements([...elements, newElement]);
    setNewElementContent("");
    setNewQuestionOptions(["", "", ""]);
  };

  const handleSavePage = () => {
    savePage(page.id, { ...page, elements });
  };

  return (
    <div>
      <h2>{page.title}</h2>

      <div>
        <label>Тип элемента:</label>
        <select onChange={(e) => setNewElementType(e.target.value)} value={newElementType}>
          <option value="text">Текст</option>
          <option value="video">Видео</option>
          <option value="question">Вопрос</option>
        </select>
      </div>

      <div>
        <label>Содержимое:</label>
        <input
          type="text"
          value={newElementContent}
          onChange={(e) => setNewElementContent(e.target.value)}
        />
      </div>

      {newElementType === "question" && (
        <div>
          <label>Ответы:</label>
          {newQuestionOptions.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...newQuestionOptions];
                  newOptions[index] = e.target.value;
                  setNewQuestionOptions(newOptions);
                }}
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={handleAddElement}>Добавить элемент</button>

      <div>
        <h3>Добавленные элементы</h3>
        {elements.map((element, index) => (
          <div key={index}>
            {element.type === "text" && <p>{element.content}</p>}
            {element.type === "video" && <video src={element.url} controls />}
            {element.type === "question" && (
              <div>
                <p>{element.questionText}</p>
                {element.options.map((option, idx) => (
                  <div key={idx}>
                    <label>
                      <input
                        type="radio"
                        name={`question${index}`}
                        disabled
                        checked={option.isCorrect}
                      />
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={handleSavePage}>Сохранить страницу</button>
    </div>
  );
}
