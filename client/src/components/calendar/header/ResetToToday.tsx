import React from 'react';
import 'styles/header/reset-to-today.css'

const ResetToday: React.FC = () => {
  const handleClick = () => {
    alert('Go to today');
  };

  return (
    <div>
      <button className="today-button">
        <span>오늘</span>
        <div className="tooltip" role="tooltip" aria-hidden="true">today</div>
      </button>
    </div>
  );
};

export default ResetToday;