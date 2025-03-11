import React, { ChangeEvent, useState } from 'react';
import 'styles/header/view-selector.css'

interface ViewSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
}       

const ViewSelector: React.FC<ViewSelectorProps> = ({ isOpen, onToggle }) => {
  const [selectedItem, setSelectedItem] = useState("일");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onToggle();
  };  

  const getCorrespondingLetter = (item: string) => {
    switch (item) {
      case '일':
        return 'D';
      case '주':
        return 'W';
      case '월':
        return 'M';
      case '연도':
        return 'Y';
      default:
        return '';
    }
  };

  return (
    <div className="view-selector">
      <button className="view-selector-button" onClick={onToggle}>
        <span className="button-text">{selectedItem}</span>
        <span className="button-icon">▼</span>
      </button>

      <ul className={`view-selector-list ${isOpen ? "open" : ""}`}>
        {["일", "주", "월", "연도"].map((item) => (
          <li key={item} onClick={() => handleItemClick(item)} className="list-item">
            <span>{item}</span>
            <span>{getCorrespondingLetter(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSelector;