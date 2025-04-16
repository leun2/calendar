import React, { useState } from 'react';
import ViewSelector from 'components/calendar/header/CalendarViewSelector';
import DateDisplay from 'components/calendar/header/DateDisplay';
import DateShifter from 'components/calendar/header/DateShifter';
import DropDown from 'components/calendar/header/SettingsDropDown';
import logo from '../../assets/images/logo.png';
import 'styles/styles.css'
import ResetToday from 'components/calendar/header/ResetToToday';
import 'styles/font.css'
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
	navigateToView: (view: 'day' | 'week' | 'month' | 'year', date?:Date) => void;
}

const Header: React.FC<HeaderProps> = ({ navigateToView }) => {
	// const navigate = useNavigate();

	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const handleToggleDropdown = (dropdown: string) => {
		setOpenDropdown(openDropdown === dropdown ? null : dropdown); // 클릭된 드롭다운만 열리게 설정
	};

	function handleNavigateRoute() {
		// navigate(`/`);
	}

	return (
		<header className="header" style={{background:""}}>
			{/* <div className="image-container">
				<img src={logo} alt="logo" />
			</div> */}
			<div className='logo-container' style={{ fontWeight:"400", fontSize:"24px", cursor:"default" }} onClick={handleNavigateRoute}>
				calendar
			</div>

			<div style={{marginLeft:"100px" }}>
				<ResetToday />
			</div>
			<div style={{marginLeft:"30px"}}>
				<DateShifter />
			</div>
			<div style={{marginLeft:"15px" , fontWeight:"400", fontSize:"24px"}}>
				<DateDisplay />
			</div>
			<div  style={{marginLeft:"350px" }}>
			<DropDown
				isOpen={openDropdown === "dropDown"}
				onToggle={() => handleToggleDropdown("dropDown")}
			/>
			</div>
			<div  style={{marginLeft:"5px" }}>
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