import React, { useEffect, useRef, useState } from "react";
import "styles/content/calendar-by-day.css";

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

const CalendarByDay: React.FC <CalendarProps> = ({events, year, month, day, setModalDetails, setActiveModal, setModalDate }) => {

  const date = new Date(
    year && month && day
      ? `${year}-${month}-${day}`
      : new Date().toLocaleDateString()
  );

  const [currentTimeString, setCurrentTimeString] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTimeString(
        `${hours}:${minutes < 10 ? "0" + minutes : minutes}`
      );
    }, 60000); // 매 1분마다 현재 시간을 업데이트

    return () => clearInterval(interval);
  }, []);

  const timezone = "GMT+09";
  const dayOfTheWeek = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
  ][date.getDay()]; // 요일
  const today = new Date(); // 날짜

  const isToday = date.getFullYear() === today.getFullYear() && 
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate()

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

  const quarter = ["15", "30", "45", "00"];

  const getHourIndex = (time: string) => {
    const [hour, minute] = time.split(":");
    const minuteValue = parseInt(minute);

    const quarter = Math.floor(minuteValue / 15) * 0.25;

    return parseInt(hour) + quarter; // 9:15 -> 9.25, 9:30 -> 9.5, 9:45 -> 9.75
  };

  const calculateEventPosition = (events: any[]) => {
    const positions: any[] = [];
    const maxWidth = 700;

    events.forEach((event, index) => {
      const startIdx = getHourIndex(event.startTime.split("T")[1]);
      const endIdx = getHourIndex(event.endTime.split("T")[1]);
      const topPosition = startIdx * 40.7;
      const height = (endIdx - startIdx) * 40.7;

      let leftPosition = 0;
      let width = 250;

      positions.forEach((pos) => {
        if (
          pos.topPosition < topPosition + height &&
          pos.topPosition + pos.height > topPosition
        ) {
          leftPosition = Math.min(pos.leftPosition + 150, maxWidth - 150);
          width = Math.max(width - 100, 200);
        }
      });

      positions.push({ topPosition, leftPosition, height, width });
    });

    return positions;
  };

  const eventPositions = calculateEventPosition(events);

  function handleEventClick(event: any) {
    setModalDetails({
      isOpen: true,
      type: "event",
      data: event
    });
  }

  function handleTaskClick(task: any) {
    setModalDetails({
      isOpen: true,
      type: "task",
      data: task
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

const formatTimeRange = (start?: string, end?: string) => {
    const t1 = start?.split("T")[1];
    const t2 = end?.split("T")[1];
    if (!t1 || !t2) return '';
    const d1 = new Date(`2000-01-01T${t1}`);
    const d2 = new Date(`2000-01-01T${t2}`);
    const h1 = d1.getHours().toString().padStart(2, '0');
    const m1 = d1.getMinutes().toString().padStart(2, '0');
    const h2 = d2.getHours().toString().padStart(2, '0');
    const m2 = d2.getMinutes().toString().padStart(2, '0');
    return `${h1}:${m1} ~ ${h2}:${m2}`;
  };

  function handleContentClick() {
      setModalDate({
        modalYear: year,
        modalMonth: month,
        modalDay: day,
      });
      setActiveModal("event");
  }

  return (
    <div className="day-calendar">
      <div className="day-calendar-header">
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
            <span className="day-calendar-timezone">{timezone}</span>
          </div>
        </div>
        <div style={{ width: "92%", height: "100%", display: "flex" }}>
          <div style={{ padding: "10px 0px 0px 10px" }}>
            <div className={`day-calendar-day-of-the-week ${isToday ? "day-calendar-day-of-the-week-today" : ""} `} >{dayOfTheWeek}</div>
            <div className={`day-calendar-day ${isToday ? "day-calendar-day-today" : ""} `}>{day}</div>
          </div>
        </div>
      </div>

      <div className="day-calendar-content">
        <div className="day-calendar-timeline">
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

        <div className="day-calendar-space">
          {hours.map((index) => (
            <div key={index} className="space-border" />
          ))}
        </div>

        <div className="day-calendar-schedule">
          {events.map((event, index) => {

            

            if (!event.startTime || !event.endTime) return null;
            const startIdx = getHourIndex(event.startTime.split("T")[1]);
            const endIdx = getHourIndex(event.endTime.split("T")[1]);
            const topPosition = startIdx * 40;
            const height = (endIdx - startIdx) * 40.7;
            const { leftPosition } = eventPositions[index];

            // 일정이 짧은 경우를 판별 (예: 1시간 미만)
            const isShortEvent = height < 40; // 1시간 미만의 일정

            console.log(event.color)
            return (
              <div
                key={event.id}
                className="event-box"
                style={{
                    top: topPosition,
                    left: leftPosition, // 겹치는 일정 왼쪽으로 배치
                    height: height > 40 ? height : 22,
                    cursor: "pointer",
                    background: getRgbByColorName(event.color),
                    paddingLeft: "5px",
                    paddingTop: !isShortEvent ? "5x" : "",
                }}

                onClick={() => handleEventClick(event)} // 클릭 시 이벤트
              > 
              
              {isShortEvent ? (
                <span>
                  {event.title} {formatTimeRange(event.startTime, event.endTime)}
                </span>
              ) : (
                <>
                  <span>{event.title}</span>
                  <span>
                    {formatTimeRange(event.startTime, event.endTime)}
                  </span>
                </>
              )}
              </div>
            );
          })}
          {/* {tasks.map((task, index) => {
            
            const startIdx = getHourIndex(task.dueDate.split(" ")[1]);
            const topPosition = startIdx * 40;
            const height =  20.7;
            
            return (
                <div
                key={task.id}
                className="event-box"
                style={{
                    top: topPosition,
                    left: "0px", // 겹치는 일정 왼쪽으로 배치
                    height: height,
                    cursor: "pointer",
                    justifyItems:"center",
                    background:"#039BE5"
                }}

                onClick={() => handleTaskClick(task)} // 클릭 시 이벤트
                >
                    <span style={{color:"#fff", fill:"#fff",}}>
                        <svg enable-background="new 0 0 24 24" focusable="false" height="14" viewBox="0 0 24 24" width="14"><rect fill="none" height="24" width="24"></rect>
                            <path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"></path>
                        </svg>
                        <span>{' '}</span>
                        {task.title} {task.dueDate.split(" ")[1]}
                    </span>
                </div>
            );
            })} */}
          {hours.map((hour, hourIndex) => (
            <div key={hourIndex} className="schedule-column">
              {quarter.map((qtr, qtrIndex) => {
                const timeString = `${hourIndex}:${qtrIndex * 15}`;

                const startIdx = getHourIndex(timeString);
                const topPosition = startIdx * 40.7;
                const isCurrentTime =
                  `${new Date().getHours()}:${
                    Math.floor(new Date().getMinutes() / 15) * 15
                  }` === timeString;

                return (
                  <div>
                    {isCurrentTime && isToday ? (
                      <div>
                        <div
                          className="current-time-ball"
                          style={{ top: `${getHourIndex(timeString) * 40 + 5}px` }}
                        />
                        <div className="quarter" onClick={handleContentClick}/>
                        <div className="current-time" />
                      </div>
                    ) : (
                      <div>
                        <div className="quarter" onClick={handleContentClick}/>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarByDay;
