// components/auth/AuthImagePanel.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import 'styles/font.css'

const ImagePanel = () => {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: '#48BBED',
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '50vw'
      }}

    >
      <Typography variant="h3" color='#F3F3F3'
        sx={{
            fontFamily: "Montserrat Alternates",
            fontWeight: 600
        }}>
        calendar
      </Typography>
    </Box>
  );
};

export default ImagePanel;
