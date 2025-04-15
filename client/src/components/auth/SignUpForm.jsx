import React, { useState } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp } from 'api/authApi';

function SignUpForm({ onPrev, email }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);

    // const [showConfirm, setShowConfirm] = useState(false);
    // const toggleConfirm = () => setShowConfirm((prev) => !prev);

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            // confirmPassword: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('이름은 필수입니다'),
            password: Yup.string()
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
                    '영문, 숫자, 특수문자 포함 8자 이상 입력해주세요'
                )
                .required('비밀번호는 필수입니다'),
            // confirmPassword: Yup.string()
            //     .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
            //     .required('비밀번호 확인은 필수입니다')
        }),
        onSubmit: async (values) => {
            const success = await signUp(email, values.password, values.name, 'LOCAL');
            if (success) navigate('/signin');
            else console.log('회원가입 실패');
        }
    });

  return (
    <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            backgroundColor: '#fff',
            width: '50vw'
        }}
    >
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%', maxWidth: 300 }}>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight="bold">계정 생성</Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton
                        onClick={onPrev}
                        disableRipple
                        aria-label="돌아가기"
                        sx={{
                            borderRadius: 2,
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                            '&:active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography variant="body2" sx={{ fontSize: '14px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {email}
                    </Typography>
                </Stack>

                <TextField
                    fullWidth
                    label="사용자 이름"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                    fullWidth
                    label="비밀번호"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                disableRipple
                                onClick={togglePassword}
                                aria-label="비밀번호 보기 전환"
                                sx={{
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                                    '&:active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                                }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* <TextField
                    fullWidth
                    label="비밀번호 확인"
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton onClick={toggleConfirm}>
                            {showConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    )
                    }}
                /> */}

                <Button type="submit" variant="contained" fullWidth size="large">등록</Button>

                <Typography fontSize={14}>
                    이미 계정이 있나요?{' '}
                    <a href="/signin" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    로그인
                    </a>
                </Typography>
            </Stack>
        </Box>
    </Box>
  );
}

export default SignUpForm;
