import React, { useEffect, useRef } from "react";
import 'styles/modal/event-modal-time-drop-down.css'

interface EventModalTimeDropDownProps {
    setTimeDropDown: (isTimeDropDownOpen: boolean) => void;
    setTime: (time: string) => void;
    isOpen: boolean;
}

function EventModalTimeDropDown({isOpen, setTime, setTimeDropDown}: EventModalTimeDropDownProps) {

    const modalRef = useRef<HTMLDivElement>(null);

    const hours = [
        "오전 00", "오전 01", "오전 02", "오전 03", "오전 04", "오전 05",
        "오전 06", "오전 07", "오전 08", "오전 09", "오전 10", "오전 11",
        "오후 12", "오후 01", "오후 02", "오후 03", "오후 04", "오후 05",
        "오후 06", "오후 07", "오후 08", "오후 09", "오후 10", "오후 11",
    ];

    const quarters = ["00", "15", "30", "45"];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setTimeDropDown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setTimeDropDown]);

    function handleListItemClick(hour:string, quarter:string) {
        setTime(`${hour}:${quarter}`);
        setTimeDropDown(false);
    }

    return(
        <div ref={modalRef}>
            <ul className={`modal-time-list ${isOpen ? "open" : ""}`}>
                {hours.map((hour) => (
                    quarters.map((quarter) => (
                        <li className="modal-time-list-item" key={`${hour}-${quarter}`} onClick={() => handleListItemClick(hour, quarter)}>
                            {hour}:{quarter}
                        </li>
                    ))
                ))}
            </ul>
        </div>
    )
}

export default EventModalTimeDropDown;