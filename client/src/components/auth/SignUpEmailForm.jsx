import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import OAuthButtons from './OAuthButtons';

function SignUpEmailForm({ onNext }) {

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
                            계정 생성
                        </Typography>

                        <Typography sx={{color:'#666666', fontSize:'11px'}}>
                            이를 클릭함으로써 귀하는 
                            <a 
                                href=" "
                                style={{ textDecoration: 'none', color: '#1976d2' }}>
                                    서비스 약관
                            </a>과 
                            <a 
                                href=" "
                                style={{ textDecoration: 'none', color: '#1976d2' }}>
                                개인정보 처리방침
                            </a>을 읽고 이에 동의한 것으로 간주됩니다.
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
                            이미 계정이 있나요?{' '}
                            <a
                                href="/signin"
                                style={{ textDecoration: 'none', color: '#1976d2' }}>
                                로그인
                            </a>
                        </Typography>
                    </Stack>

                    <OAuthButtons />
                </Stack>
                
            </Box>
        </Box>
    );
}

export default SignUpEmailForm;