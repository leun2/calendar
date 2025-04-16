import React, { useCallback, useEffect, useState } from 'react';
import 'styles/styles.css'
import CalendarByDay from 'components/calendar/content/CalendarByDay';
import CalendarByWeek from 'components/calendar/content/CalendarByWeek';
import CalendarByMonth from 'components/calendar/content/CalendarByMonth';
import CalendarByYear from 'components/calendar/content/CalendarByYear';
import EventModal from 'components/modal/event/EventModal';
import TaskModal from 'components/modal/task/TaskModal';
import EventDetailsModal from 'components/modal/details/EventDetailsModal';
import TaskDetailsModal from 'components/modal/details/TaskDetailsModal';
import { getEventsByUnitWithDate } from 'api/calendarApi';

interface ContentProps {
    viewType: "day" | "week" | "month" | "year";
    year: number;
    month: number;
    day: number;
    activeModal: "event" | "task" | null;
    setActiveModal: (type: "event" | "task" | null) => void;
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

const Content: React.FC<ContentProps> = ({ viewType, year, month, day, activeModal, setActiveModal }) => {

    const [detailsModal, setDetailsModal] = useState({
        isOpen: false,
        type: null,
        data: null
    });

    const [events, setEvents] = useState<EventDetails[]>([]);
    const [tasks, setTasks] = useState<TaskDetails[]>([]);

    const getEvents = useCallback(() => {
        getEventsByUnitWithDate(viewType, year, month, day)
            .then(response => {
                const { events, tasks } = response.data;
                setEvents(events);
                setTasks(tasks);
            })
            .catch((error) => errorResponse(error));
    }, [viewType, year, month, day]);

    useEffect(() => 
        getEvents()
    , [viewType, year, month, day]);
    
    function errorResponse(error:any) {
        console.log(error)
    }

    return (
        <div className="content">
            {activeModal === "event" && 
                <EventModal 
                    year={year} 
                    month={month} 
                    day={day} 
                    setActiveModal={setActiveModal} 
                    activeModal={activeModal}
                    refreshEvents={getEvents} />} 

            {activeModal === "task" && <TaskModal year={year} month={month} day={day} setActiveModal={setActiveModal} activeModal={activeModal}/>} 
            
            {detailsModal.isOpen && (
                <>
                    {detailsModal.type === 'event' && detailsModal.data && (
                        <EventDetailsModal
                            data={detailsModal.data}
                            onClose={() =>
                                setDetailsModal({ isOpen: false, type: null, data: null })
                            }
                            refreshEvents={getEvents}
                        />
                    )}

                    {detailsModal.type === 'task' && detailsModal.data && (
                        <TaskDetailsModal
                            data={detailsModal.data}
                            onClose={() =>
                                setDetailsModal({ isOpen: false, type: null, data: null })
                            }
                        />
                    )}
                </>
            )}

            {viewType === "day" && 
                <CalendarByDay 
                    events={events}
                    tasks={tasks} 
                    year={year} 
                    month={month} 
                    day={day} 
                    setModalDetails={setDetailsModal} />}

            {viewType === "week" && 
                <CalendarByWeek 
                    events={events} 
                    tasks={tasks} 
                    year={year} 
                    month={month} 
                    day={day} 
                    setModalDetails={setDetailsModal} />}

            {viewType === "month" && 
                <CalendarByMonth 
                    events={events} 
                    tasks={tasks} 
                    year={year} 
                    month={month} 
                    day={day}
                    setModalDetails={setDetailsModal} />}
                    
            {viewType === "year" && <CalendarByYear year={year} month={month} day={day} />}
        </div>
    );
};

export default Content;