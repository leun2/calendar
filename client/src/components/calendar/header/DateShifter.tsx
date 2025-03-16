import React from "react";
import 'styles/header/date-shifter.css'

function DateShifter() {

    return (
        <div className="date-shifter">
            <button className="shift-button">
                <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
                </svg>
                <div className="tooltip" role="tooltip" aria-hidden="true">전일</div>
            </button>
                            
            <button className="shift-button">
                <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                </svg>
                <div className="tooltip" role="tooltip" aria-hidden="true">다음날</div>
            </button>
        </div>
    );
}   

export default DateShifter;

