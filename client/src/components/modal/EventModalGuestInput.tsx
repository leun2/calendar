import React, { useState } from "react";
import "styles/modal/event-modal-guest-input.css";

interface EventModalGuestInputProps {
    guests: string[];
    setGuests: (guests: string[]) => void;
}

function EventModalGuestInput({guests, setGuests}: EventModalGuestInputProps) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {

            setGuests([...guests, inputValue.trim()]); // 입력값 추가
            setInputValue(""); // 입력 필드 초기화
            event.preventDefault(); // 기본 이벤트 방지 (폼 제출 방지)
        }
    };

    const handleRemoveGuest = (index: number) => {
        setGuests(guests.filter((_, i) => i !== index)); // 해당 인덱스 삭제
    };

    return (
        <div className="event-modal-guest-container-open">
            <div className="event-modal-guest-input">
            <input
                type="text"
                className="event-modal-form-guest"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="참석자 추가"
            />
            </div>
        </div>
    );
};

export default EventModalGuestInput;
