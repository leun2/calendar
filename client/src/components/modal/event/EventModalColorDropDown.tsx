import React, { useEffect, useRef } from "react";
import 'styles/modal/event-modal-color-drop-down.css'

interface EventModalColorDropDownProps {
    setDropDown: (isDropDownOpen: boolean) => void;
    setColor: (color: string) => void;
    setPalette: (palette: string) => void;
    isOpen: boolean;
}

function EventModalColorDropDown({isOpen, setColor, setDropDown, setPalette}: EventModalColorDropDownProps) {

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

    function handleListItemClick(color : string, palette : string) {
        setPalette(palette)
        setColor(color);
        setDropDown(false);
    }

    const colors = 
                [[{"TOMATO":"rgb(213, 0, 0)"}, {"LIGHT_PINK":"rgb(230, 124, 115)"}], 
                [{"TANGERINE":"rgb(244, 81, 30)"}, {"BANANA":"rgb(246, 191, 38)"}], 
                [{"SAGE":"rgb(51, 182, 121)"}, {"BASIL":"rgb(11, 128, 67)"}], 
                [{"PEACOCK":"rgb(3, 155, 229)"}, {"BLUEBERRY":"rgb(63, 81, 181)"}], 
                [{"LAVENDER":"rgb(121, 134, 203)"}, {"GRAPE":"rgb(142, 36, 170)"}]]

    return(
        <div ref={modalRef}>
            <div className={`modal-color-list ${isOpen ? "open" : ""}`}>
            {colors.map((row, rowIndex) => (
                <div className="color-row" key={rowIndex}>
                {row.map((colorObj, idx) => {
                    const [[color, palette]] = Object.entries(colorObj);

                    return (
                    <div
                        key={idx}
                        className="color-dot"
                        style={{ backgroundColor: palette }}
                        title={color}
                        onClick={() => handleListItemClick(color, palette)}
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