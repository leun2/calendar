import React from "react";
import { useParams } from "react-router-dom";

const DateDisplay: React.FC = () => {
  const { viewType, year, month, day } = useParams();

  const date = new Date(
    year && month && day
      ? `${year}-${month}-${day}`
      : new Date()
  );

  // 주간(week) 처리: 현재 날짜가 속한 주의 시작과 끝을 계산
  const getWeekRange = () => {
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay()); // 해당 주의 일요일 (0)
    
    const lastDayOfWeek = new Date(date);
    lastDayOfWeek.setDate(date.getDate() + (6 - date.getDay())); // 해당 주의 토요일 (6)

    const startMonth = firstDayOfWeek.getMonth() + 1;
    const endMonth = lastDayOfWeek.getMonth() + 1;

    return startMonth === endMonth
      ? `${date.getFullYear()}년 ${startMonth}월`
      : `${date.getFullYear()}년 ${startMonth}월 - ${endMonth}월`;
  };

  let displayText = "";
  switch (viewType) {
    case "day":
      displayText = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`;
      break;
    case "week":
      displayText = getWeekRange();
      break;
    case "month":
      displayText = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
      break;
    case "year":
      displayText = `${date.getFullYear()}년`;
      break;
    default:
      displayText = "";
  }

  return (
    <div>
      <span>{displayText}</span>
    </div>
  );
};

export default DateDisplay;
