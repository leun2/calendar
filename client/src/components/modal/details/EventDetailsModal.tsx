import React, { useCallback, useEffect, useRef, useState } from "react";
import 'styles/modal/event-modal.css';
import 'styles/modal/details-modal.css';
import { deleteEventApi } from "api/eventApi";

interface DetailsData {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    description?: string;
    location?: string;
    color: string;
    // 필요에 따라 속성 추가
}

interface Props {
    data: DetailsData;
    onClose: () => void;
    refreshEvents: () => void; // 💡 새로 추가
}

type ColorGroup = Array<Record<string, string>>;

function EventDetailsModal({ data, onClose, refreshEvents }: Props) {

    console.log(data.color)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    
    function formatEventTime(startTime: string, endTime: string): string {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
    
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
    
        const year = startDate.getFullYear();
        const month = startDate.getMonth() + 1;
        const date = startDate.getDate();
        const day = days[startDate.getDay()];
    
        const pad = (n: number) => n.toString().padStart(2, '0');
        const startHour = pad(startDate.getHours());
        const startMinute = pad(startDate.getMinutes());
        const endHour = pad(endDate.getHours());
        const endMinute = pad(endDate.getMinutes());
    
        return `${year}년 ${month}월 ${date}일 (${day}요일) ${startHour}:${startMinute}~${endHour}:${endMinute}`;
    }


    const modalRef = useRef<HTMLDivElement>(null);

    function handleEventRemove(event_id : number) {

        deleteEventApi(event_id)
            .then((res) => {
                        console.log("이벤트 저장 성공", res.data);
                        refreshEvents();
                    })
                    .catch((err) => {
                        console.error("이벤트 저장 실패", err);
                    });
                    
        onClose()
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
        <div className="details-modal-overlay">
            <div className="details-modal" ref={modalRef}>
                <div className="details-modal-header">
                    <button className="details-modal-header-button" onClick={() => handleEventRemove(data.id)} >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                            <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                        </svg>
                    </button>
                    <button className="details-modal-header-button" onClick={onClose}>
                        <i className="material-icons">close</i>
                    </button>
                </div>

                <div className="details-modal-content" >
                    <div className="details-modal-container" style={{width:"100%", height:"61px"}}>
                        <div className="details-modal-icon-container">
                            <div className="details-modal-color" style={{ background: getRgbByColorName(data.color) }} />
                        </div>
                        
                        <div className="details-modal-detail-container">
                            <div className="details-modal-title">
                                {data.title}
                            </div>
                            <div className="details-modal-schedule">
                                {
                                    formatEventTime(data.startTime, data.endTime)
                                }
                            </div>
                        </div>
                    </div>
                    {
                        data.location &&
                        <div className="details-modal-container" style={{width:"100%", height:"50px"}}>
                            <div className="details-modal-icon-container">
                                <svg focusable="false" width="24" height="24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" />
                                    <circle cx="12" cy="9" r="2.5" />
                                </svg>
                            </div>
                            <div className="details-modal-detail-container">
                                <div className="details-modal-location">
                                    <span>
                                        {data.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        data.description &&
                        <div className="details-modal-container" style={{width:"100%", height:"50px"}}>
                            <div className="details-modal-icon-container">
                                <i className="material-icons">notes</i>
                            </div>
                            <div className="details-modal-detail-container">
                                <div className="details-modal-description">
                                    <span>
                                        {data.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="details-modal-footer"/>
            </div>
        </div>
    );
}

export default EventDetailsModal