import React, { useState } from 'react';
import 'styles/styles.css'
import CalendarByDay from 'components/calendar/content/CalendarByDay';
import CalendarByWeek from 'components/calendar/content/CalendarByWeek';
import CalendarByMonth from 'components/calendar/content/CalendarByMonth';
import CalendarByYear from 'components/calendar/content/CalendarByYear';
import EventModal from 'components/modal/EventModal';
import TaskModal from 'components/modal/TaskModal';

interface ContentProps {
    viewType: "day" | "week" | "month" | "year";
    year: number;
    month: number;
    day: number;
    activeModal: "event" | "task" | null;
    setActiveModal: (type: "event" | "task" | null) => void;
}

const Content: React.FC<ContentProps> = ({ viewType, year, month, day, activeModal, setActiveModal }) => {

  return (
        <div className="content">
            {activeModal === "event" && <EventModal year={year} month={month} day={day} setActiveModal={setActiveModal} activeModal={activeModal}/>} 
            {activeModal === "task" && <TaskModal year={year} month={month} day={day} setActiveModal={setActiveModal} activeModal={activeModal}/>} 
            {viewType === "day" && <CalendarByDay year={year} month={month} day={day} />}
            {viewType === "week" && <CalendarByWeek year={year} month={month} day={day} />}
            {viewType === "month" && <CalendarByMonth year={year} month={month} day={day} />}
            {viewType === "year" && <CalendarByYear year={year} month={month} day={day} />}
        </div>
    );
};

export default Content;