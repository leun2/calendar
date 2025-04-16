import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'styles/header/date-shifter.css'

function DateShifter() {

    const { viewType, year, month, day } = useParams();

    const navigate = useNavigate();

    const date = new Date(
        year && month && day
            ? `${year}-${month}-${day}`
            : new Date().toLocaleDateString()
    );
    
    const handleDayBefore = () => {
        let newDate;

        if (viewType === "year") {
            newDate = new Date(date.setFullYear(date.getFullYear() - 1));
        } else if (viewType === "month") {
            newDate = new Date(date.setMonth(date.getMonth() - 1));
        } else if (viewType === "week") {
            newDate = new Date(date.setDate(date.getDate() - 7));
        } else if (viewType === "day") {
            newDate = new Date(date.setDate(date.getDate() - 1));
        } else {
            newDate = new Date(date);
        }

        navigate(`/${viewType}/${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`);
    };

    const handleNextDay = () => {
        let newDate;

        if (viewType === "year") {
            newDate = new Date(date.setFullYear(date.getFullYear() + 1));
        } else if (viewType === "month") {
            newDate = new Date(date.setMonth(date.getMonth() + 1));
        } else if (viewType === "week") {
            newDate = new Date(date.setDate(date.getDate() + 7));
        } else if (viewType === "day") {
            newDate = new Date(date.setDate(date.getDate() + 1));
        } else {
            newDate = new Date(date);
        }

        navigate(`/${viewType}/${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`);
    };

    return (
        <div className="date-shifter">
            <button className="shift-button" onClick={() => handleDayBefore()}>
                <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
                </svg>
                <div className="tooltip" role="tooltip" aria-hidden="true">전일</div>
            </button>
                            
            <button className="shift-button" onClick={() => handleNextDay()}>
                <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                </svg>
                <div className="tooltip" role="tooltip" aria-hidden="true">다음날</div>
            </button>
        </div>
    );
}   

export default DateShifter;

