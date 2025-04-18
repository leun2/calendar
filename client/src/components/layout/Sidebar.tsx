import React, { useState } from 'react';
import CreateSchedule from 'components/calendar/sidebar/CreateSchedule';
import MiniCalendar from 'components/calendar/sidebar/MiniCalendar';
import 'styles/styles.css'
import EmailButton from 'components/calendar/sidebar/EmailButton';
import GitHubButton from 'components/calendar/sidebar/GitHubButton';

interface SidebarProps {
  setActiveModal: (type: "event" | "task" | null) => void;
}

function Sidebar({ setActiveModal }: SidebarProps) {
    return (
      <div className="sidebar">
        <CreateSchedule setActiveModal={setActiveModal} />
        <MiniCalendar />
        <div className='sidebar-button-container'>
            <GitHubButton />

            <EmailButton recipient="leun12968@gmail.com" />
        </div>
      </div>
    );
};

export default Sidebar;