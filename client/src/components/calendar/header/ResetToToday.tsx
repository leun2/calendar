import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import 'styles/header/reset-to-today.css'

const ResetToday: React.FC = () => {

  const { viewType } = useParams();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${viewType}`);
  };

  return (
    <div>
      <button className="today-button" onClick={() => handleClick()}>
        <span>오늘</span>
        <div className="tooltip" role="tooltip" aria-hidden="true">today</div>
      </button>
    </div>
  );
};

export default ResetToday;