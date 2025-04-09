import React, { useState } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SignUpForm({ onPrev, email }) {

    const [showPassword, setShowPassword] = useState(false);
    
    const [inputUserName, setInputUserName] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleEmailEnvaild =() => {
        email = ''
        onPrev();
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center', // 수직 정중앙
                justifyContent: 'center', // 수평 정중앙
                px: 2, // 반응형 여백
                backgroundColor: '#fff',}}>
        <Box sx={{ width: '100%', maxWidth: 300 }}>
            <Stack spacing={2}>

                {/* Heading */}
                <Typography variant="h5" fontWeight="bold">
                    계정 생성
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box>
                        <IconButton
                            disableRipple
                            aria-label="돌아가기"
                            data-testid="back-button"
                            sx={{
                                borderRadius: 2, // 약간 둥근 사각형
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                                '&:active': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                }
                            }}
                            onClick={handleEmailEnvaild}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>

                    <Typography variant="body" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize:'14px', color:'#666666' }}>
                        {email}
                    </Typography>
                </Stack>
                {/* Input fields */}
                <TextField 
                    fullWidth 
                    label="사용자 이름"
                    value={inputUserName}
                    onChange={(e) => setInputUserName(e.target.value)} />
                <TextField
                    fullWidth
                    label="비밀번호"
                    type={showPassword ? 'text' : 'password'}
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    InputProps={{
                    endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                disableRipple
                                onClick={handleTogglePassword}
                                aria-label="비밀번호 보기 전환"
                                sx={{
                                    borderRadius: 2, // 약간 둥근 사각형
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)', // 연한 회색 배경
                                    },
                                    '&:active': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    }
                                }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                

                {/* Signup button */}
                <Button variant="contained" fullWidth size="large">
                    등록
                </Button>

                {/* Login link */}
                <Typography fontSize={14}>
                    이미 계정이 있나요?{' '}
                    <a
                        href="/signin"
                        style={{ textDecoration: 'none', color: '#1976d2' }}>
                    로그인
                    </a>
                </Typography>
            </Stack>
        </Box>
        </Box>
    );
}

export default SignUpForm;