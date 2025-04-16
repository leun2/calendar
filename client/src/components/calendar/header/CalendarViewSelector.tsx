import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'; // URL 파라미터 가져오기
import 'styles/header/calendar-view-selector.css';

interface ViewSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  navigateToView: (view: 'day' | 'week' | 'month' | 'year', date?:Date) => void;
}

const CalendarViewSelector: React.FC<ViewSelectorProps> = ({ isOpen, onToggle, navigateToView }) => {
  const { viewType, year, month, day} = useParams(); // 현재 URL의 뷰 타입 가져오기
  const selectorRef = useRef<HTMLDivElement>(null);

  const date = new Date(
    year && month && day
      ? `${year}-${month}-${day}`
      : new Date
  );

  const viewMap: Record<string, 'day' | 'week' | 'month' | 'year'> = {
    '일': 'day',
    '주': 'week',
    '월': 'month',
    '연도': 'year',
  };

  const reverseViewMap: Record<'day' | 'week' | 'month' | 'year', string> = {
    day: '일',
    week: '주',
    month: '월',
    year: '연도',
  };

  const [selectedItem, setSelectedItem] = useState("일");

  useEffect(() => {
    if (viewType && Object.values(viewMap).includes(viewType as any)) {
      setSelectedItem(reverseViewMap[viewType as 'day' | 'week' | 'month' | 'year']);
    }
  }, [viewType]); // URL이 변경될 때 반영

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    navigateToView(viewMap[item], date); // 선택한 뷰 변경
    onToggle(); // 드롭다운 닫기
  };

  const getCorrespondingLetter = (item: string) => {
    switch (item) {
      case '일': return 'D';
      case '주': return 'W';
      case '월': return 'M';
      case '연도': return 'Y';
      default: return '';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        onToggle(); // 바깥 클릭 시 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="view-selector" ref={selectorRef}>
      <button className="view-selector-button" onClick={onToggle}>
        <span className="button-text">{selectedItem}</span>
        <span className="button-icon">▼</span>
      </button>

      {isOpen && (
        <ul className="view-selector-list open">
          {["일", "주", "월", "연도"].map((item) => (
            <li key={item} onClick={() => handleItemClick(item)} className="list-item">
              <span>{item}</span>
              <span>{getCorrespondingLetter(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarViewSelector;
