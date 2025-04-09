import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'styles/sidebar/mini-calendar.css'

const MiniCalendar: React.FC = () => {
    const navigate = useNavigate();

    const { viewType, year, month, day} = useParams();

    const date = new Date(
        year && month && day
            ? `${year}-${month}-${day}`
            : new Date().toLocaleDateString()
    );
    
    const [currentDate, setCurrentDate] = useState(date);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        const newDate = new Date(
          year && month && day 
          ? `${year}-${month}-${day}` 
          : today.toLocaleDateString()
        );
        setSelectedDate(newDate);
        setCurrentDate(newDate);
    }, [year, month, day]); 

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = firstDayOfMonth.getDay(); // 이번 달의 첫날 요일 (0: 일요일 ~ 6: 토요일)
    const daysInMonth = lastDayOfMonth.getDate(); // 이번 달의 총 날짜 개수

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

    const today = new Date();

    // 날짜 클릭 핸들러
    const handleDateClick = (date: Date) => {
        setCurrentDate(date);
        setSelectedDate(date);
        navigate(`/${viewType}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
    };

    // 이전/다음 달 이동 함수
    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
      <div className="mini-calendar">
        <div className="calendar-header">
          <span className="calendar-year-month">
            {currentDate.toLocaleString("ko-KR", {
              year: "numeric",
              month: "long",
            })}
          </span>
          <div className="month-shifter">
            <button className="calendar-shift-button" onClick={goToPrevMonth}>
              <svg width="12" height="12" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
              </svg>
              <div className="tooltip">이전 달</div>
            </button>
            <button className="calendar-shift-button" onClick={goToNextMonth}>
              <svg width="12" height="12" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
              </svg>
              <div className="tooltip">다음 달</div>
            </button>
          </div>
        </div>

        <table className="mini-calendar-table">
          <thead className="mini-calendar-table-head">
            <tr>
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="mini-calendar-table-body">
            {Array.from({ length: 6 }, (_, weekIndex) => (
              <tr key={weekIndex}>
                {allDays
                  .slice(weekIndex * 7, (weekIndex + 1) * 7)
                  .map(({ day, isCurrentMonth, date }) => (
                    <td
                      key={date.toString()}
                      className={`mini-calendar-item 
                                        ${
                                            date.toDateString() ===
                                            today.toDateString()
                                              ? "today"
                                              : ""
                                        }
                                        ${
                                          selectedDate?.toDateString() ===
                                          date.toDateString()
                                            ? "selected"
                                            : ""
                                        } 
                                        `}
                      onClick={() => handleDateClick(date)}
                    >
                      {day}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};
export default MiniCalendar;