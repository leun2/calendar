import React from "react";
import 'styles/sidebar/create-schedule.css'

interface ButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

const CreateSchedule: React.FC<ButtonProps> = ({ isOpen, onToggle }) => {

    const handleItemClick = (item: string) => {
        onToggle();
    };

    return (
        <div className="create-schedule">
            <button className="create-schedule-button" onClick={onToggle}>
                <span className="create-icon">+</span>
                <span className="create-button-text">만들기</span>
                <span className="button-icon">▼</span>
            </button>
            <ul className={`create-schedule-list ${isOpen ? "open" : ""}`}>
                {["이벤트", "할 일"].map((item) => (
                <li key={item} onClick={() => handleItemClick(item)} className="list-item">
                    {item}
                </li>
                ))}
            </ul>
        </div>
    );
}   

export default CreateSchedule;