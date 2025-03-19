import React, { useEffect, useRef, useState } from "react";
import "styles/content/calendar-by-day.css";

const CalendarByDay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours}:${minutes < 10 ? "0" + minutes : minutes}`);
    }, 60000); // 매 1분마다 현재 시간을 업데이트

    return () => clearInterval(interval);
  }, []);

  const timezone = "GMT+09";
  const dayByWeek = "목";
  const today = "20";

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

  const events = [
    { id: 1, title: "회의", startTime: "09:00", endTime: "10:30" },
    { id: 2, title: "개발 작업", startTime: "09:30", endTime: "11:00" },
    { id: 3, title: "점심 약속", startTime: "12:00", endTime: "13:45" },
    { id: 4, title: "코드 리뷰", startTime: "09:45", endTime: "10:15" },
    { id: 5, title: "회의", startTime: "16:30", endTime: "18:00" },
  ];

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
    const maxWidth = 700; // 화면 너비(%)

    events.forEach((event, index) => {
      const startIdx = getHourIndex(event.startTime);
      const endIdx = getHourIndex(event.endTime);
      const topPosition = startIdx * 40.7;
      const height = (endIdx - startIdx) * 40.7;

      // 겹치는 일정을 처리 (간단히 왼쪽으로 배치)
      let leftPosition = 0;
      let width = 250; // 기본 일정 크기

      positions.forEach((pos) => {
        if (
          pos.topPosition < topPosition + height &&
          pos.topPosition + pos.height > topPosition
        ) {
          // leftPosition을 화면 너비를 넘지 않게 제한
          leftPosition = Math.min(pos.leftPosition + 150, maxWidth - 150); // 일정 간격을 40%로 설정
          width = Math.max(width - 100, 200); // 일정이 겹칠 경우 너비를 줄임
        }
      });

      positions.push({ topPosition, leftPosition, height, width });
    });

    return positions;
  };
  const eventPositions = calculateEventPosition(events);

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
          <div style={{ padding: "0px 0px 0px 10px" }}>
            <div className="day-calendar-day-by-week">{dayByWeek}</div>
            <div className="day-calendar-day">{today}</div>
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
            const startIdx = getHourIndex(event.startTime);
            const endIdx = getHourIndex(event.endTime);
            const topPosition = startIdx * 40.7;
            const height = (endIdx - startIdx) * 40.7;
            const { leftPosition } = eventPositions[index];

            // 일정이 짧은 경우를 판별 (예: 1시간 미만)
            const isShortEvent = height < 40.7; // 1시간 미만의 일정

            return (
              <div
                key={event.id}
                className="event-box"
                style={{
                  top: topPosition,
                  left: leftPosition, // 겹치는 일정 왼쪽으로 배치
                  height: height,
                }}
                onClick={() => alert(`Event: ${event.title}`)} // 클릭 시 이벤트
              >
                {isShortEvent ? (
                  <span>
                    {event.title} {event.startTime} ~ {event.endTime}
                  </span>
                ) : (
                  <>
                    <span>{event.title}</span>
                    <span>
                      {event.startTime} ~ {event.endTime}
                    </span>
                  </>
                )}
              </div>
            );
          })}
          {hours.map((hour, hourIndex) => (
            <div key={hourIndex} className="schedule-column">
              {quarter.map((qtr, qtrIndex) => {
                const timeString = `${hourIndex}:${qtrIndex * 15}`;

                const startIdx = getHourIndex(timeString);
                const topPosition = startIdx * 40.7 + 4;
                const isCurrentTime =
                  `${new Date().getHours()}:${
                    Math.floor(new Date().getMinutes() / 15) * 15
                  }` === timeString;
                console.log(
                  `${new Date().getHours()}:${
                    Math.floor(new Date().getMinutes() / 15) * 15
                  }`
                );
                console.log(timeString);
                console.log(isCurrentTime);
                return (
                  <div>
                    {isCurrentTime ? (
                      <div>
                        <div
                          className="current-time-ball"
                          style={{ top: topPosition }}
                        />
                        <div className="quarter" />
                        <div className="current-time" />
                      </div>
                    ) : (
                      <div>
                        <div className="quarter" />
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
