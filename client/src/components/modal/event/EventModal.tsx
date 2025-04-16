import React, { useCallback, useEffect, useRef, useState } from "react";
import 'styles/modal/event-modal.css';
import EventModalCalendar from "components/modal/event/EventModalCalendar";
import EventModalTimeDropDown from "components/modal/event/EventModalTimeDropDown";
import EventModalGuestInput from "components/modal/event/EventModalGuestInput";
import EventModalDescriptionInput from "components/modal/event/EventModalDescriptionInput";
import EventModalColorDropDown from "components/modal/event/EventModalColorDropDown";
import { createEventApi } from "api/eventApi";

interface EventModalProps {
    year: number;
    month: number;
    day: number;
    activeModal: "event" | "task" | null;
    setActiveModal: (type: "event" | "task" | null) => void;
    refreshEvents: () => void;
}

interface EventRequestDto {
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    color: string;
}

function EventModal({ year, month, day, activeModal, setActiveModal, refreshEvents }: EventModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [isScrolled, setIsScrolled] = useState(true);
    const [isScheduleOpen, setSchedule] = useState(false);
    const [isGuestOpen, setGuestState] = useState(false);
    const [isLocationOpen, setLocationState] = useState(false);
    const [isDescriptionOpen, setDescriptionState] = useState(false);
    const [isEventStatusOpen, setEventStatusState] = useState(false);
    const [isDateScheduleOpen, setDateSchedule] = useState(false);
    const [isStartTimeOpen, setStartTimeDropDown] = useState(false);
    const [isColorDropDownOpen, setColorDropDownState] = useState(false);
    const [isEndTimeOpen, setEndTimeDropDown] = useState(false);

    const handleDateScheduleClick = () => {
        setDateSchedule((prev) => !prev);
        setStartTimeDropDown(false)
        setEndTimeDropDown(false)
    };

    const handleStartTimeClick = () => {
        setStartTimeDropDown((prev) => !prev);
        setDateSchedule(false)
        setEndTimeDropDown(false)
    };

    const handleEndTimeClick = () => {
        setEndTimeDropDown((prev) => !prev);
        setDateSchedule(false)
        setStartTimeDropDown(false)
    };

    const handleColorClick = () => {
        setColorDropDownState((prev) => !prev)
        setDateSchedule(false)
        setStartTimeDropDown(false)
        setEndTimeDropDown(false)
    }

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

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setActiveModal(null);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [setActiveModal]);

    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
            setIsScrolled(scrollTop + clientHeight < scrollHeight); // 스크롤이 남아있는 경우 true
        };

        contentRef.current?.addEventListener("scroll", handleScroll);
        return () => contentRef.current?.removeEventListener("scroll", handleScroll);
    }, []);

    const [startDate, setStartDate] = useState<string>(
        `${date.getMonth() + 1}월 ${date.getDate()}일 (${dayOfTheWeek}요일)`
    );

    const [startTime, setStartTime] = useState(() => {
        const [hourStr, minuteStr] = currentTimeString.split(":");
        let hour = parseInt(hourStr, 10);
        if (hour === 24) hour = 0; // 24시는 00시로 보정
    
        const newTime = `${hour}:${minuteStr}`;
        const period = hour < 12 ? "오전" : "오후";
        
        return `${period} ${getHourIndex(newTime)}`;
    });

    const [endTime, setEndTime] = useState(() => {
        const [hourStr, minuteStr] = currentTimeString.split(":");
        let hour = parseInt(hourStr, 10) + 1;
        if (hour === 24) hour = 0; // 24시는 00시로 보정
    
        const newTime = `${hour}:${minuteStr}`;
        const period = hour < 12 ? "오전" : "오후";
        
        return `${period} ${getHourIndex(newTime)}`;
    });

    const [guests, setGuests] = useState<string[]>([]);
    const [color, setColor] = useState<string>("PEACOCK");
    const [palette, setPalette] = useState<string|null>(null);

    const handleRemoveGuest = (index: number) => {
        setGuests(guests.filter((_, i) => i !== index)); // 해당 인덱스 삭제
    };

    const name = "leun"

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("");
    const [selectedDate, setSelectedDate] = useState(
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    );
    // const selectedStartTime = ((t => `${(t[0] === '오후' && t[1].split(':')[0] !== '12' ? +t[1].split(':')[0] + 12 : t[0] === '오전' && t[1].split(':')[0] === '12' ? '00' : t[1].split(':')[0]).toString().padStart(2, '0')}:${t[1].split(':')[1]}`)(startTime.split(' ')));
    // const selectedEndTime = ((t => `${(t[0] === '오후' && t[1].split(':')[0] !== '12' ? +t[1].split(':')[0] + 12 : t[0] === '오전' && t[1].split(':')[0] === '12' ? '00' : t[1].split(':')[0]).toString().padStart(2, '0')}:${t[1].split(':')[1]}`)(endTime.split(' ')));
    const selectedStartTime = startTime.split(' ')[1]
    const selectedEndTime = endTime.split(' ')[1]

    const [timeError, setTimeError] = useState(false);

    function handleSaveEvent() {

        const start = new Date(`${selectedDate}T${selectedStartTime}`);
        const end = new Date(`${selectedDate}T${selectedEndTime}`);

        if (start >= end) {
            setTimeError(true);
    
            // 1초 후에 에러 상태 제거
            setTimeout(() => setTimeError(false), 1000);
            return;
        }else {
            const eventData: EventRequestDto = {
                title: title.trim() === "" ? "제목 추가" : title,
                description: description,
                location: location,
                startTime: selectedDate+"T"+selectedStartTime,
                endTime: selectedDate+ "T" +selectedEndTime,
                color: color,
            };
        
            createEventApi(eventData)
                .then((res) => {
                    console.log("이벤트 저장 성공", res.data);
                    refreshEvents();
                })
                .catch((err) => {
                    console.error("이벤트 저장 실패", err);
                });
            setActiveModal(null)
        }
    }

    return (
        <div className="modal-overlay">
            <div className={`event-modal
                    ${isScheduleOpen ? "event-modal-expanded" : ""}`} 
                    ref={modalRef}>
                <div className="event-modal-header">
                    <button className="event-modal-close" onClick={() => setActiveModal(null)}>
                        <i className="material-icons">close</i>
                    </button>
                </div>
                <div className="event-modal-content" 
                    style={{overflow: (isDateScheduleOpen || isStartTimeOpen || isEndTimeOpen ) ? 'hidden' : '',}}
                    ref={contentRef}
                    >
                    <div className="event-modal-container" style={{width:"100%", height:"20%"}}>
                        <div style={{width:"15%", height:"100%"}}/>
                        <div className="event-modal-title-container">
                            <div className="title-container">
                                <input 
                                    className="event-modal-form-title" 
                                    type="text" 
                                    name="title"
                                    placeholder="제목 추가"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="event-modal-container" style={{width:"100%", height:"13%", marginBottom:"10px"}}>
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

                    <div className="event-modal-container" style={{width:"100%", height:"15%"}}>
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
                                        && ( <EventModalCalendar 
                                            setDateSchedule = {setDateSchedule}
                                            setStartDate = {setStartDate}
                                            setSelected = {setSelectedDate} />
                                )}
                                <div className="time-picker-wrapper" style={{ position: "relative" }}>
                                    <div onClick={handleStartTimeClick}>
                                        <input
                                            type="text"
                                            className="event-modal-form-start-time"
                                            value={startTime}
                                        />
                                    </div>

                                    <EventModalTimeDropDown
                                        setTimeDropDown={setStartTimeDropDown}
                                        setTime={setStartTime}
                                        isOpen={isStartTimeOpen}
                                        timeError = {timeError}
                                    />
                                </div>


                                <span  aria-label="-" style={{fontSize: "8px", paddingLeft:"7px", paddingRight:"7px"}}>—</span>
                                <div className={`time-picker-wrapper ${timeError ? "error" : ""}`} style={{ position: "relative" }}>
                                    <div onClick={handleEndTimeClick}>
                                        <input 
                                            type="text" 
                                            className="event-modal-form-end-time" 
                                            value={endTime} />
                                    </div>
                                    <EventModalTimeDropDown
                                        setTimeDropDown = {setEndTimeDropDown}
                                        setTime = {setEndTime}
                                        isOpen = {isEndTimeOpen}
                                        timeError = {timeError}
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
                                            <span  aria-label="-" style={{fontSize: "8px", paddingLeft:"7px", paddingRight:"7px"}}>—</span>
                                            <span>
                                                {endTime}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{width: "100%", height:"50%", display: "flex", alignItems: "center", fontSize: "12px"}}>
                                        <span>시간대
                                        <span style={{paddingLeft:"5px", paddingRight:"5px", fontSize: "16px"}}>·</span>
                                            반복 안함</span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="event-modal-container" style={{width:"100%", height: isGuestOpen ? "" : "13%"}}>
                        
                        <div className="event-modal-icon">
                            <svg focusable="false" width="24" height="24">
                                <path d="M15 8c0-1.42-.5-2.73-1.33-3.76.42-.14.86-.24 1.33-.24 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.43 0-.84-.09-1.23-.21-.03-.01-.06-.02-.1-.03A5.98 5.98 0 0 0 15 8zm1.66 5.13C18.03 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.58-3.47-6.34-3.87zM9 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 9c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2M9 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 9c2.67 0 8 1.34 8 4v3H1v-3c0-2.66 5.33-4 8-4z" />
                            </svg>
                        </div>
                        {
                            
                            isGuestOpen 
                            ? (
                                <EventModalGuestInput 
                                    guests = {guests} 
                                    setGuests = {setGuests}
                                />
                            )
                            : (
                                <div className="event-modal-guest-container-close">
                                    <button className="event-modal-form-guest-button" onClick={() =>setGuestState(true)}>
                                        참석자 추가
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    <div className="event-modal-container" style={{width:"100%", height: isGuestOpen ? "" : "0%"}}>
                    <div style={{ width:"15%" }} />
                        <div className="event-modal-guest-tags">
                            {guests.map((guest, index) => (
                                <span key={index} className="guest-tag" onClick={() => handleRemoveGuest(index)}>
                                    {guest}
                                    <button className="remove-btn">×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="event-modal-container" style={{width:"100%", height:"13%"}}>
                        <div className="event-modal-icon">
                            <svg focusable="false" width="24" height="24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>
                        </div>
                        {
                            isLocationOpen 
                            ? (
                                <div className="event-modal-location-container-open">
                                    <div>
                                        <input 
                                            type="text" 
                                            className="event-modal-form-location"
                                            name="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="위치 추가" />
                                    </div>
                                </div>
                            )
                            : (
                                <div className="event-modal-location-container-close">
                                    <button className="event-modal-form-location-button" onClick={() => setLocationState(true)}>
                                        위치 추가
                                    </button>
                                </div>
                            )
                        
                        }
                    </div>
                    
                    <div className="event-modal-container" style={{width:"100%", height:"13%"}}>
                         <div className="event-modal-icon">
                            <i className="material-icons">notes</i>
                        </div>
                        {
                            isDescriptionOpen 
                            ? (
                                <div className="event-modal-description-container-open">
                                    <div className="event-modal-description-icon-container">

                                        <div className="event-modal-description-icon">
                                            <span className="material-icons">format_bold</span>
                                        </div>

                                        <div className="event-modal-description-icon">
                                            <span className="material-icons">format_italic</span>
                                        </div>

                                        <div className="event-modal-description-icon">
                                            <span className="material-icons">format_underlined</span>
                                        </div>
                                        <div
                                            style={{
                                                width: "1px",
                                                height: "20px",
                                                backgroundColor: "#ccc",
                                                margin: "0 8px",
                                            }}
                                        />
                                        <div className="event-modal-description-icon">
                                            <span className="material-icons">format_list_numbered</span>
                                        </div>

                                        <div className="event-modal-description-icon">
                                            <span className="material-icons">format_list_bulleted</span>
                                        </div>
                                        
                                        <div
                                            style={{
                                                width: "1px",
                                                height: "20px",
                                                backgroundColor: "#ccc",
                                                margin: "0 8px",
                                            }}
                                        />

                                        <div className="event-modal-description-icon">
                                            <span className="material-icons">insert_link</span>
                                        </div>

                                        <div className="event-modal-description-icon"   >
                                            <span className="material-icons">format_clear</span>
                                        </div>
                                       
                                    </div>
                                </div>
                            )
                            : (
                                <div className="event-modal-description-container-close">
                                    <button className="event-modal-form-description-button" onClick={() => setDescriptionState(true)}>
                                        설명 추가
                                    </button>
                                </div>
                            )
                        
                        }
                    </div>
                    {isDescriptionOpen && (
                        <div className="event-modal-container" style={{ width: "100%", paddingBottom:"5px" }}>
                            <div style={{ width: "15%" }} />
                            <EventModalDescriptionInput setDescription={setDescription} />
                        </div>
                    )}

                    <div className="event-modal-container" style={{width:"100%", height:"18%"}}>
                        <div className="event-modal-icon">
                            <i className="material-icons">event</i>
                        </div>
                        {
                            isEventStatusOpen 
                            ? (
                                <div className="event-modal-event-status-container-open">
                                    
                                    <button className="event-modal-form-color-drop-down-button" onClick={handleColorClick}>
                                        <div className="event-modal-set-color" style={{ background: palette !== null ? palette : "rgb(3, 155, 229)" }}/>

                                        <svg height="22" viewBox="0 0 24 24" width="22" fill="#455A64" style={{ transform: isColorDropDownOpen ? "rotate(180deg)" : ""}} >
                                            <path d="M0 0h24v24H0V0z" fill="none" />
                                            <path d="M7 10l5 5 5-5H7z"/>
                                        </svg>
                                    </button>
                                    {
                                        isColorDropDownOpen 
                                            && <EventModalColorDropDown 
                                                    setDropDown = {setColorDropDownState}
                                                    isOpen = {isColorDropDownOpen}
                                                    setColor = {setColor}
                                                    setPalette = {setPalette} />
                                    }
                                </div>
                            )
                            : (
                                <div className="event-modal-event-status-container-close">
                                    <button className="event-modal-form-event-status-button" onClick={() => setEventStatusState(true)}>
                                        <div style={{ width:"100%", height:"100%"}}>
                                            <div style={{ width:"100%", height:"45%", display:"flex", alignContent:"center"}}>
                                                <span style={{fontSize:"15px"}}>{name}</span>
                                                <div style={{ 
                                                    width:"14px", 
                                                    height:"14px", 
                                                    background:"#039BE5", 
                                                    borderRadius:"50%",
                                                    marginTop: "2px",
                                                    marginLeft:"4px" }} />
                                            </div>
                                            <div style={{ width:"100%", height:"55%", display:"flex", alignContent:"center"}}>
                                                <span>바쁨</span>
                                                <span>·</span>
                                                <span>기본 공개 설정</span>
                                                <span>·</span>
                                                <span>30분 전에 알림</span>
                                            </div>
                                        </div> 
                                    </button>
                                </div>
                            )
                        
                        }
                    </div>
                </div>



                <div className={`event-modal-footer ${isScrolled ? "footer-shadow" : ""}`}>
                    <button className="event-modal-save" onClick={() =>handleSaveEvent()}>
                        <span>저장</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventModal;
