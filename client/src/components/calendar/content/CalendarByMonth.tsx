import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/content/calendar-by-month.css'

interface CalendarProps {
    events: EventDetails[];
    tasks: TaskDetails[];
    year: number;
    month: number;
    day: number;
    setModalDetails: any;
    setActiveModal: (type: "event" | "task" | null) => void;
    setModalDate: (date: { modalYear: number; modalMonth: number; modalDay: number }) => void;
}

interface EventDetails {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    description?: string;
    location?: string;
    color: string;
    // 필요에 따라 속성 추가
}

interface TaskDetails {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    description?: string;
    location?: string;
    color: string;
}

type ColorGroup = Array<Record<string, string>>;

const CalendarByMonth: React.FC <CalendarProps> = ({ events, tasks, year, month, day, setModalDetails, setActiveModal, setModalDate }) => {
    const navigate = useNavigate();

    const currentDate = new Date(year, month - 1, day);

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    // 이전 달의 마지막 날 구하기
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const prevMonthDays = Array.from({ length: startDay }, (_, i) => ({
        day: prevLastDay - (startDay - 1) + i,
        isCurrentMonth: false,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevLastDay - (startDay - 1) + i)
    }));

    // 이번 달 날짜 리스트
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        isCurrentMonth: true,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
    }));

    // 다음 달의 날짜 채우기 (총 6줄 기준)
    const totalCells = 42; // 7일 * 6주 = 42개
    const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => ({
        day: i + 1,
        isCurrentMonth: false,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1)
    }));

    // 전체 날짜 배열
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    const today = new Date()

    // 날짜 클릭 핸들러
    const handleDateClick = (date: Date) => {
        navigate(`/day/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
    };

    const getEventsForDate = (date: Date) => {
        const localDateString = 
            `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return events.filter(event => event.startTime.startsWith(localDateString));
    };

    const colors: ColorGroup[] = [
        [{ "TOMATO": "rgb(213, 0, 0)" }, { "LIGHT_PINK": "rgb(230, 124, 115)" }],
        [{ "TANGERINE": "rgb(244, 81, 30)" }, { "BANANA": "rgb(246, 191, 38)" }],
        [{ "SAGE": "rgb(51, 182, 121)" }, { "BASIL": "rgb(11, 128, 67)" }],
        [{ "PEACOCK": "rgb(3, 155, 229)" }, { "BLUEBERRY": "rgb(63, 81, 181)" }],
        [{ "LAVENDER": "rgb(121, 134, 203)" }, { "GRAPE": "rgb(142, 36, 170)" }],
      ];
    
    const getRgbByColorName = (name: string): string => {
        for (const group of colors) {
            for (const colorObj of group) {
                if (colorObj[name]) {
                    return colorObj[name];
                }
            }
        }
        return "#ccc"; // 혹시 못 찾았을 경우 기본 색상
    };

    function handleEventClick(event: any, e: any) {
        e.stopPropagation(); 
        setModalDetails({
          isOpen: true,
          type: "event",
          data: event
        });
    }

    function handleContentClick(year : number, month : number, day : number) {
        setModalDate({
            modalYear: year,
            modalMonth: month,
            modalDay: day,
        });
        setActiveModal("event");
    }

    return (
        <div className="month-calendar">
            <div className="month-calendar-header">
                {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                    <div key={index} className={day === "일" ? "day-of-the-week-sunday" : "month-calendar-day-of-the-week"}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="month-calendar-content">
                {Array.from({ length: 6 }, (_, weekIndex) => (
                    <div key={weekIndex} className="month-calendar-column">
                        {allDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map(({ day, date }, index) => {
                                const dayEvents = getEventsForDate(date);
                                return (
                                <div
                                    key={date.getTime()}
                                    className={`${index === 0 ? "day-sunday" : "month-calendar-item"}`}
                                >
                                    <div style={{ width: "100%", height: "40%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    
                                        <div className={`month-calendar-date 
                                            ${date.toDateString() === today.toDateString() ? "month-calendar-today" : ""} 
                                            ${date.getDate() === 1 ? 
                                                date.toDateString() === today.toDateString() ? 
                                                    "first-day-today" : "first-day" 
                                                : ""}`} 
                                            onClick={() => handleDateClick(date)}
                                            style={{ maxHeight:"22px", minWidth:"22px"}}>
                                                <span >
                                                    {date.getDate() === 1 ? 
                                                        date.toDateString() === today.toDateString() ? 
                                                            day
                                                            : `${date.getMonth() + 1}월 ${date.getDate()}일`
                                                        : day
                                                    }
                                                </span>
                                        </div>
                                    </div>
                                    <div className="event-container" onClick={() => handleContentClick(date.getFullYear(), date.getMonth() + 1, date.getDate())}>
                                        {dayEvents.length < 3 ? (
                                            <>
                                                {dayEvents.slice(0, 2).map(event => (
                                                    <>
                                                        <div key={event.id} className="event-item" onClick={(e) => handleEventClick(event, e)} style={{background: getRgbByColorName(event.color)}}>
                                                            <span style={{ paddingLeft:"5px"}}>{event.title}</span>
                                                        </div>
                                                        <div style={{ height:"5%"}}/>
                                                    </>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {dayEvents.slice(0, 1).map(event => (

                                                    <div key={event.id} className="event-item" onClick={(e) => handleEventClick(event, e)}  style={{background: getRgbByColorName(event.color)}}>
                                                        <span style={{ paddingLeft:"5px"}} >{event.title}</span>
                                                    </div>
                                                ))}
                                                <div style={{ height:"5%"}}/>
                                                <div className="more-events" onClick={() => handleDateClick(date)}>
                                                    <span>{dayEvents.length - 1}개 더보기</span>
                                                </div>
                                            </>
                                        )
                                    }
                                    </div>
                                </div>
                            )})}

                    </div>  
                ))}
            </div>
        </div>
    );
};

export default CalendarByMonth;