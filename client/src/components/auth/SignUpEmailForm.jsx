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

function SignUpEmailForm({ onNext }) {

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
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: '50vw'
            }}
        >
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%', maxWidth: 300 }}>
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