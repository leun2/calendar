import React from 'react';
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

type EmailButtonProps = {
  recipient: string;
};

function EmailButton({ recipient }: EmailButtonProps) {

	const mailtoLink = `mailto:${recipient}`;

	// const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	
	const handleClick = () => {
		window.location.href = mailtoLink;
	};

	return (
		<Button
			variant="contained"
			color="primary"
			startIcon={<EmailIcon />}
			onClick={handleClick}
			sx={{
				width:"200px",
				textTransform: "none",
				marginTop:"10px"
			}}
		>
			Send Email
		</Button>
	);
}

export default EmailButton;
