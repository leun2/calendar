import React, { useState, useEffect, useRef } from "react";
import 'styles/sidebar/create-schedule.css';


interface CreateScheduleProps {
    setActiveModal: (type: "event" | "task" | null) => void;
  }
  

function CreateSchedule({ setActiveModal }: CreateScheduleProps) {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement | null>(null);

    const handleButtonClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleItemClick = (item: string) => {
      if (item === "이벤트") {
        setActiveModal("event");
      } else if(item === "할 일") {
        setActiveModal("task");
      }
      setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };


    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="create-schedule">
        <button className="create-schedule-button" onClick={handleButtonClick}>
          <span className="create-icon">
            <i className="material-icons">add</i>

            
          </span>
          <span className="create-button-text">만들기</span>
        </button>
        <ul
          ref={dropdownRef}
          className={`create-schedule-list ${isOpen ? "open" : ""}`}
        >
          {["이벤트", "할 일"].map((item) => (
            <li
              key={item}
              onClick={() => handleItemClick(item)}
              className="list-item"
            >
              {item}
            </li>
          ))}
        </ul>

        </div>
    );
}

  
  export default CreateSchedule;
