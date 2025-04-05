import React, { useEffect, useRef } from "react";
import 'styles/modal/event-modal-color-drop-down.css'

interface EventModalColorDropDownProps {
    setDropDown: (isDropDownOpen: boolean) => void;
    setColor: (color: string | null) => void;
    isOpen: boolean;
}

function EventModalColorDropDown({isOpen, setColor, setDropDown}: EventModalColorDropDownProps) {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setDropDown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setDropDown]);

    function handleListItemClick(color : string) {
        setColor(color);
        setDropDown(false);
    }

    const colors = 
                [[{"토마토":"rgb(213, 0, 0)"}, {"연분홍":"rgb(230, 124, 115)"}], 
                [{"귤":"rgb(244, 81, 30)"}, {"바나나":"rgb(246, 191, 38)"}], 
                [{"세이지":"rgb(51, 182, 121)"}, {"바질":"rgb(11, 128, 67)"}], 
                [{"공작":"rgb(3, 155, 229)"}, {"블루베리":"rgb(63, 81, 181)"}], 
                [{"라벤더":"rgb(121, 134, 203)"}, {"포도":"rgb(142, 36, 170)"}], 
                [{"흑연":"rgb(97, 97, 97)"},]]

    return(
        <div ref={modalRef}>
            <div className={`modal-color-list ${isOpen ? "open" : ""}`}>
            {colors.map((row, rowIndex) => (
                <div className="color-row" key={rowIndex}>
                {row.map((colorObj, idx) => {
                    const [[name, color]] = Object.entries(colorObj);

                    return (
                    <div
                        key={idx}
                        className="color-dot"
                        style={{ backgroundColor: color }}
                        title={name}
                        onClick={() => handleListItemClick(color)}
                    />
                    );
                })}
                </div>
            ))}
            </div>
        </div>
    )
}

export default EventModalColorDropDown;