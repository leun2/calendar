import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import OAuthButtons from './OAuthButtons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignInEmailForm({ onNext }) {

    const formik = useFormik({
            initialValues: {
              email: ''
            },
            validationSchema: Yup.object({
              email: Yup.string()
                .email('유효한 이메일 주소를 입력해주세요')
                .required('이메일은 필수입니다')
            }),
            onSubmit: async (values) => {
                // const success = await checkEmailAvailability(email);
                // if(success)
                onNext(values.email);
            }
            // onSubmit: ({ email }) => {
            //     onNext(email);
            // }
    });

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center', // 수직 정중앙
                justifyContent: 'center', // 수평 정중앙
                backgroundColor: '#fff',
                width: '50vw'
            }}
        >
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%', maxWidth: 300 }}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <Typography variant="h5" fontWeight="bold">
                            로그인
                        </Typography>

                        <Typography sx={{color:'#666666', fontSize:'16px'}}>
                            calendar로 계속
                        </Typography>
                    </Stack>
                    <Stack spacing={2}>
                        <TextField 
                            fullWidth 
                            label="이메일"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email} />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            fullWidth 
                            size="large">
                            계속
                        </Button>

                        <Typography fontSize={14}>
                            calendar를 처음 사용하시나요? {' '}
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