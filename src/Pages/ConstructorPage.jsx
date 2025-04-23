// src/pages/ConstructorPage.js
import React, { useState } from "react";
import Sidebar from "../components/constructor/Sidebar";
import PageEditor from "../components/constructor/PageEditor";

const ConstructorPage = () => {
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);

  const handleAddSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "Новый раздел",
      pages: [],
    };
    setSections([...sections, newSection]);
  };

  const handleUpdateSections = (updatedSections) => {
    setSections(updatedSections);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        sections={sections}
        setSections={handleUpdateSections}
        selectedSectionId={selectedSectionId}
        setSelectedSectionId={setSelectedSectionId}
        selectedPageId={selectedPageId}
        setSelectedPageId={setSelectedPageId}
        onAddSection={handleAddSection}
      />
      <div className="flex-1 p-4 bg-white border-l overflow-y-auto">
        <PageEditor
          sections={sections}
          setSections={handleUpdateSections}
          selectedSectionId={selectedSectionId}
          selectedPageId={selectedPageId}
        />
      </div>
    </div>
  );
};

export default ConstructorPage;
