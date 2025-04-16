import React, { useState } from "react";

export default function EditableTitle({ title, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const handleBlur = () => {
    setIsEditing(false);
    if (value.trim() !== "" && value !== title) {
      onChange(value.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return isEditing ? (
    <input
      autoFocus
      className="editable-input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span className="editable-title" onClick={() => setIsEditing(true)}>
      {title}
    </span>
  );
}
