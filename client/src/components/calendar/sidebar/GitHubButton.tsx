import React from 'react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function GitHubButton() {
  const link = `https://github.com/leun2/calendar`;

  const handleClick = () => {
    window.open(link, '_blank'); // 새 탭에서 열기
  };

  return (
    <Button
        variant="outlined"
        color="inherit"
        // variant="contained"
		// color="primary"
        startIcon={<GitHubIcon />}
        onClick={handleClick}
        sx={{
            width:"200px",
            textTransform: "none"
        }}
        
    >
      Open GitHub
    </Button>
  );
}

export default GitHubButton;
