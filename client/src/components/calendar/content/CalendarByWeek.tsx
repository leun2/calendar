import React from "react";
import "styles/content/calendar-by-week.css";

interface CalendarProps {
  events: EventDetails[];
  tasks: TaskDetails[];
  year: number;
  month: number;
  day: number;
  setModalDetails: any;
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

const CalendarByWeek: React.FC <CalendarProps> = ({ events, tasks, year, month, day, setModalDetails }) => {
    const timezone = "GMT+09";

    const date = new Date(
      year && month && day
        ? `${year}-${month}-${day}`
        : new Date().toLocaleDateString()
    );

    const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];

    const dateIndex = date.getDay();
    const today = new Date();

    

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() - dateIndex + i); // 이번 주의 해당 요일 날짜 계산
      return {
        day: dayOfTheWeek[i], // 요일
        date: newDate.getDate(), // 날짜
        isToday:
          newDate.getFullYear() === today.getFullYear() &&
          newDate.getMonth() === today.getMonth() &&
          newDate.getDate() === today.getDate()
      };
    });

    const quarter = ["15", "30", "45", "00"];


    // 시간대 인덱스 계산 함수
    const getHourIndex = (time: string) => {
        const [hour, minute] = time.split(":");
        const minuteValue = parseInt(minute);

        // 15분 단위로 나누어 계산
        const quarter = Math.floor(minuteValue / 15) * 0.25;

        return parseInt(hour) + quarter; // 9:15 -> 9.25, 9:30 -> 9.5, 9:45 -> 9.75
    };

    const calculateEventPosition = (events: any[]) => {
        const positions: any[] = [];
    
        events.forEach((event, index) => {
          const eventDate = new Date(event.startTime);
          const dayIndex = eventDate.getDay(); // 0(일) ~ 6(토)
          // 겹치는 일정을 처리 (간단히 왼쪽으로 배치)
          let leftPosition = 14 * dayIndex;
    
          positions.push({ leftPosition });
        });
    
        return positions;
      };

      

const eventPositions = calculateEventPosition(events);

  const hours = [
    "오전 1시",
    "오전 2시",
    "오전 3시",
    "오전 4시",
    "오전 5시",
    "오전 6시",
    "오전 7시",
    "오전 8시",
    "오전 9시",
    "오전 10시",
    "오전 11시",
    "오후 12시",
    "오후 1시",
    "오후 2시",
    "오후 3시",
    "오후 4시",
    "오후 5시",
    "오후 6시",
    "오후 7시",
    "오후 8시",
    "오후 9시",
    "오후 10시",
    "오후 11시",
    "오전 0시",
  ];

  function handleEventClick(event: any) {
    setModalDetails({
      isOpen: true,
      type: "event",
      data: event
    });
  }

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


  return (
    <div className="week-calendar">
      <div className="week-calendar-header">
        {/* 시간대 표시 */}
        <div style={{ width: "8%", height: "100%" }}>
          <div style={{ width: "100%", height: "70%" }} />
          <div
            style={{
              textAlign: "center",
              width: "100%",
              height: "30%",
              borderRight: "1px solid #ccc",
            }}
          >
            <span className="week-calendar-timezone">{timezone}</span>
          </div>
        </div>

        {/* 이번 주의 날짜 표시 */}
        <div style={{ width: "92%", height: "100%", display: "flex" }}>
          {weekDays.map(({ day, date, isToday }, index) => (
            <div style={{display:"flex", width:"14%" }}>
              <div style={{width:"30%", height:"100%"}}/>
              <div key={index} className="week-calendar-day-container">
                <div className={`week-calendar-day-of-the-week ${isToday ? "week-calendar-day-of-the-week-today" : ""}`}>
                  {day}
                </div>
                <div className={`week-calendar-day ${isToday ? "week-calendar-day-today" : ""}`}>
                  {date}
                </div>
              </div>
              <div style={{width:"30%", height:"100%"}}/>
            </div>
          ))}
        </div>
      </div>


      <div className="week-calendar-content">
        <div className="week-calendar-timeline">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="timeline-hour"
              style={{
                display: "flex", // flexbox로 설정
                alignItems: "center", // 세로 중앙 정렬
                justifyContent: "center", // 가로 중앙 정렬
              }}
            >
              {hour !== "오전 0시" && (
                <span style={{ paddingTop: "40px" }}>{hour}</span>
              )}
            </div>
          ))}
        </div>

        <div className="week-calendar-space">
          {hours.map((index) => (
            <div key={index} className="space-border" />
          ))}
        </div>

            <div className="week-calendar-schedule">

                {events.map((event, index) => {
                  
                    const startIdx = getHourIndex(event.startTime.split("T")[1]);
                    const endIdx = getHourIndex(event.endTime.split("T")[1]);
                    const topPosition = startIdx * 40;
                    const height = (endIdx - startIdx) * 40.7;
                    const { leftPosition } = eventPositions[index];
                    // 일정이 짧은 경우를 판별 (예: 1시간 미만)
                    const isShortEvent = height < 60; // 1시간 미만의 일정

                    return (
                    <div
                        key={event.id}
                        className="week-calendar-event-box"
                        style={{
                          top: topPosition,
                          left: `${leftPosition}%`, // 겹치는 일정 왼쪽으로 배치
                          height: height > 40 ? height : 20,
                          cursor: "pointer",
                          background: getRgbByColorName(event.color)
                        }}
                        onClick={() => handleEventClick(event)} // 클릭 시 이벤트
                    >
                        {isShortEvent ? (
                        <span>
                            {event.title}
                        </span>
                        ) : (
                        <>
                            <span>{event.title}</span>
                            <span>
                            {event.startTime.split("T")[1]}~{event.endTime.split("T")[1]}
                            </span>
                        </>
                        )}
                    </div>
                    );
                })}

                {weekDays.map(({ day, date, isToday }, dayIndex) => (
                    <div key={dayIndex} className="week-calendar-schedule-container">
                         {hours.map((hour, hourIndex) => (
                            <div key={`${dayIndex}-${hourIndex}`} className="week-calendar-schedule-column">
                                {quarter.map((qtr, qtrIndex) => {
                                    const timeString = `${hourIndex}:${qtrIndex * 15}`;
                                    const startIdx = getHourIndex(timeString);
                                    const topPosition = startIdx * 40;
                                    const isCurrentTime =
                                        new Date().getDay() === dayIndex && // 요일 일치 여부
                                        `${new Date().getHours()}:${Math.floor(new Date().getMinutes() / 15) * 15}` === timeString &&
                                        isToday;
                                    const leftPos = dayIndex * 14;
                                    return (
                                        <div key={`${dayIndex}-${hourIndex}-${qtrIndex}`}>
                                        {isCurrentTime ? (
                                            <div className="current-time-container">
                                                
                                                <div className="week-calendar-current-time-ball" style={{ top: `${getHourIndex(timeString) * 40 + 5}px`, left: `calc(${dayIndex * 14}% - 5px)` }} />
                                                <div className="quarter" />
                                                <div className="current-time" />
                                            </div>
                                        ) : (
                                            <div className="quarter" />
                                        )}
                                        </div>
                                    );
                                })}
                            </div>
                         ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default CalendarByWeek;
