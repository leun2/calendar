import React, { useState } from 'react';
import 'styles/modal/event-modal-description-input.css';

const EventModalDescriptionInput = () => {
  const [content, setContent] = useState('');

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  return (
    <div className="description-input-wrapper">
        <div
            className="description-input"
            contentEditable
            role="textbox"
            aria-multiline="true"
            onInput={handleInput}
            suppressContentEditableWarning={true}
            description-placeholder="설명 추가"
        />
    </div>
  );
};

export default EventModalDescriptionInput;
