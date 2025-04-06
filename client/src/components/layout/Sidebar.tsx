import React, { useState } from 'react';
import CreateSchedule from 'components/calendar/sidebar/CreateSchedule';
import MiniCalendar from 'components/calendar/sidebar/MiniCalendar';
import 'styles/styles.css'

interface SidebarProps {
  setActiveModal: (type: "event" | "task" | null) => void;
}

function Sidebar({ setActiveModal }: SidebarProps) {
    return (
      <div className="sidebar">
        <CreateSchedule setActiveModal={setActiveModal} />
        <MiniCalendar />
      </div>
    );
};

export default Sidebar;