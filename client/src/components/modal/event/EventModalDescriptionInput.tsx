import React, { useState } from 'react';
import 'styles/modal/event-modal-description-input.css';

interface Props {
  setDescription: (description: string) => void;
}

function EventModalDescriptionInput({ setDescription }: Props)  {

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setDescription(e.currentTarget.innerHTML);
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
            defaultValue={''}
        />
    </div>
  );
};

export default EventModalDescriptionInput;
