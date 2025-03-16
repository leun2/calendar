import React from 'react';

const DateDisplay: React.FC = () => {
  const today = new Date().toLocaleDateString();

  return (
    <div>
      <h2>{today}</h2>
    </div>
  );
};

export default DateDisplay;