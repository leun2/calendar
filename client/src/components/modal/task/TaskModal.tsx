import React, { useEffect, useRef, useState } from "react";
import 'styles/modal/event-modal.css';
import 'styles/modal/task-modal.css';
import EventModalCalendar from "components/modal/event/EventModalCalendar";
import EventModalTimeDropDown from "components/modal/event/EventModalTimeDropDown";
import EventModalDescriptionInput from "components/modal/event/EventModalDescriptionInput";

interface TaskModalProps {
    year: number;
    month: number;
    day: number;
    activeModal: "event" | "task" | null;
    setActiveModal: (type: "event" | "task" | null) => void;
}

function TaskModal({ year, month, day, activeModal, setActiveModal }: TaskModalProps) {

        const [isScheduleOpen, setSchedule] = useState(false);
        const [isDescriptionOpen, setDescriptionState] = useState(false);
        const [isDateScheduleOpen, setDateSchedule] = useState(false);
        const [isStartTimeOpen, setStartTimeDropDown] = useState(false);
    
        const handleDateScheduleClick = () => {
            setDateSchedule((prev) => !prev);
            setStartTimeDropDown(false)
        };
    
        const handleStartTimeClick = () => {
            setStartTimeDropDown((prev) => !prev);
            setDateSchedule(false)
        };
    
    
        const date = new Date(
            year && month && day
                ? `${year}-${month}-${day}`
                : new Date().toLocaleDateString()
        );
    
        const dayOfTheWeek = [
            "일",
            "월",
            "화",
            "수",
            "목",
            "금",
            "토",
        ][date.getDay()];
    
        const [currentTimeString, setCurrentTimeString] = useState<string>(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
        });
        
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
    
        const getHourIndex = (time: string) => {
            let [hour, minute] = time.split(":").map(Number);
            
            // 가장 가까운 15분 단위로 올림
            minute = Math.ceil(minute / 15) * 15;
            
            // 분이 60이 되면, 시간 증가
            if (minute === 60) {
                hour += 1;
                minute = 0;
            }
        
            // 한 자리 숫자일 경우 앞에 0 추가 (예: 9:5 -> 09:05)
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
        
            return `${formattedHour}:${formattedMinute}`;
        };
    
        const [startDate, setStartDate] = useState<string>(
            `${date.getMonth() + 1}월 ${date.getDate()}일 (${dayOfTheWeek}요일)`
        );
    
        const [startTime, setStartTime] = useState(
            parseInt(currentTimeString.split(":")[0], 10) < 12 
                ? `오전 ${getHourIndex(currentTimeString)}` 
                : `오후 ${getHourIndex(currentTimeString)}`
        );

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setActiveModal(null);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [setActiveModal]);

    const [description, setDescription] = useState("");
    const [selectedDate, setSelectedDate] = 
        useState(date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate());

    return (
        <div className="modal-overlay">
            <div className="task-modal" ref={modalRef}>
                <div className="event-modal-header">
                    <button className="event-modal-close" onClick={() => setActiveModal(null)}>
                        <i className="material-icons">close</i>
                    </button>
                </div>
                <div className="event-modal-content" >
                    <div className="event-modal-container" style={{width:"100%", height:"69px"}}>
                        <div style={{width:"15%", height:"100%"}}/>
                        <div className="event-modal-title-container">
                        <div className="title-container">
                            <input className="event-modal-form-title" type="text" placeholder="제목 추가" />
                        </div>
                        </div>
                    </div>

                    <div className="event-modal-container" style={{width:"100%", height:"36px", marginBottom:"10px"}}>
                        <div style={{width:"15%", height:"100%"}}/>
                        <div className="event-modal-type-container">
                            <button className={`event-modal-form-type-button 
                                ${activeModal === "event" ? "active-modal" : ''} `}
                                onClick={() => setActiveModal("event")}>이벤트</button>
                            <button className={`event-modal-form-type-button 
                                ${activeModal === "task" ? "active-modal" : ''} `}
                                onClick={() => setActiveModal("task")}>할 일</button>
                        </div>
                    </div>

                    <div className="event-modal-container" style={{width:"100%", height:"52px"}}>
                        <div className="event-modal-icon">
                            <i className="material-icons">access_time</i>
                        </div>
                        {isScheduleOpen ? (
                            <div className="event-modal-schedule-container-open">
                                <div onClick={handleDateScheduleClick}>
                                    <input 
                                        type="text" 
                                        className="event-modal-form-start-date"
                                        value={startDate} />
                                </div>
                                {
                                    isDateScheduleOpen 
                                        ? <EventModalCalendar 
                                            setDateSchedule = {setDateSchedule}
                                            setStartDate = {setStartDate}
                                            setSelected={setSelectedDate}/>
                                        : ""
                                }
                                <div className="time-dropdown-wrapper">
                                    <div onClick={handleStartTimeClick}>
                                        <input 
                                            type="text" 
                                            className="event-modal-form-start-time"
                                            value={startTime} />
                                    </div>
                                    <EventModalTimeDropDown
                                        setTimeDropDown = {setStartTimeDropDown}
                                        setTime = {setStartTime}
                                        isOpen = {isStartTimeOpen}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="event-modal-schedule-container-close">
                                <button className="event-modal-form-schedule-button" onClick={() => setSchedule(true)}>
                                    <div style={{width: "100%", height:"50%", display: "flex", alignItems: "center"}}>
                                        <span style={{fontSize: "14px"}}>{startDate}</span>
                                        <div style={{paddingLeft:"10px", height:"100%", display: "flex", alignItems: "center", fontSize: "14px"}}>
                                            <span>
                                                {startTime}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{width: "100%", height:"50%", display: "flex", alignItems: "center", fontSize: "12px"}}>
                                        <span>
                                            반복 안함
                                        </span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                    {/* { isScheduleOpen && (
                        <div className="event-modal-container" style={{width:"100%", height:"15%"}}>
                            <div>
                                
                            </div>
                            <div>

                            </div>
                        </div>
                    )} */}
                    <div className="event-modal-container" style={{ width: "100%", paddingBottom:"5px", minHeight:"80px", paddingTop:"10px" }}>
                        <div className="event-modal-icon" style={{  maxHeight:"60px" }}>
                            <i className="material-icons">notes</i>
                        </div>
                        <EventModalDescriptionInput setDescription={setDescription}/>
                    </div>
                </div>
                <div className={`event-modal-footer`}>
                    <button className="event-modal-save" onClick={() => setActiveModal(null)}>
                        <span>저장</span>
                    </button>
                </div>
            </div>
        </div>
    );
}


export default TaskModal;