import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import OAuthButtons from './OAuthButtons';

function SignInEmailForm({ onNext }) {

    const [inputEmail, setInputEmail] = useState('');

    const handleNextClick = () => {
        if (inputEmail.trim() !== '') {
            onNext(inputEmail); // 이메일 전달
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center', // 수직 정중앙
                justifyContent: 'center', // 수평 정중앙
                backgroundColor: '#fff',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 300 }}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <Typography variant="h5" fontWeight="bold">
                            로그인
                        </Typography>

                        <Typography sx={{color:'#666666', fontSize:'12px'}}>
                            Calendar로 계속
                        </Typography>
                    </Stack>
                    <Stack spacing={2}>
                        <TextField 
                            fullWidth 
                            label="이메일"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)} />

                        <Button 
                            variant="contained" 
                            fullWidth size="large" 
                            onClick={handleNextClick}>
                            계속
                        </Button>

                        <Typography fontSize={14}>
                            Calendar를 처음 사용하시나요? {' '}
                            <a
                                href="/signup"
                                style={{ textDecoration: 'none', color: '#1976d2' }}>
                                계정 생성
                            </a>
                        </Typography>
                    </Stack>

                    <OAuthButtons />
                </Stack>
                
            </Box>
        </Box>
    );
}

export default SignInEmailForm;