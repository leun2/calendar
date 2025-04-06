import React, { useState } from 'react';
import ViewSelector from 'components/calendar/header/CalendarViewSelector';
import DateDisplay from 'components/calendar/header/DateDisplay';
import DateShifter from 'components/calendar/header/DateShifter';
import DropDown from 'components/calendar/header/SettingsDropDown';
import logo from '../../assets/images/logo.png';
import 'styles/styles.css'
import ResetToday from 'components/calendar/header/ResetToToday';

interface HeaderProps {
	navigateToView: (view: 'day' | 'week' | 'month' | 'year', date?:Date) => void;
}

const Header: React.FC<HeaderProps> = ({ navigateToView }) => {

	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const handleToggleDropdown = (dropdown: string) => {
		setOpenDropdown(openDropdown === dropdown ? null : dropdown); // 클릭된 드롭다운만 열리게 설정
	};

	return (
		<header className="header">
			<div className="image-container">
				<img src={logo} alt="logo" />
			</div>
			<span style={{ fontWeight:"400", fontSize:"24px", paddingLeft:"10px" }}>Calendar</span>
			<div style={{paddingLeft:"30px" }}>
				<ResetToday />
			</div>
			<div style={{paddingLeft:"30px"}}>
				<DateShifter />
			</div>
			<div style={{paddingLeft:"15px" , fontWeight:"400", fontSize:"24px"}}>
				<DateDisplay />
			</div>
			<div  style={{paddingLeft:"350px" }}>
			<DropDown
				isOpen={openDropdown === "dropDown"}
				onToggle={() => handleToggleDropdown("dropDown")}
			/>
			</div>
			<div  style={{paddingLeft:"5px" }}>
			<ViewSelector
				isOpen={openDropdown === "viewSelector"}
				onToggle={() => handleToggleDropdown("viewSelector")}
				navigateToView={navigateToView}
			/>
			</div>
		</header>
	);
};

export default Header;