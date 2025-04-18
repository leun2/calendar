import {
    Button,
    Stack,
    Divider,
} from '@mui/material';

import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "components/auth/AuthContext";

function OAuthButtons() {

    const navigate = useNavigate();
    const authContext = useAuth();

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        console.log(credentialResponse);
        const credential = credentialResponse.credential;

        // AuthContext의 Google 로그인 함수 호출
        const success = await authContext.loginWithGoogle(credential)
        if (success) {
            navigate('/'); // 로그인 성공 후 리다이렉트
        } else {
            // 로그인 실패 처리 (AuthContext에서 에러 상태 관리 권장)
            console.error('Google 로그인 실패');
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google 로그인 에러:', error);
        // 에러 처리
    };

    return(
        <>
            <Divider>또는</Divider>
            <Stack spacing={1}>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={({ onClick, disabled }) => (
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={
                            <svg viewBox="0 0 24 24" width="22" height="22" >
                                <path d="M22.0608 12.2361C22.0608 11.5384 22.0043 10.8369 21.8836 10.1505H12.2024V14.1029H17.7464C17.5163 15.3777 16.7771 16.5053 15.6947 17.2219V19.7864H19.0022C20.9445 17.9988 22.0608 15.3588 22.0608 12.2361Z" fill="#4285F4"></path>
                                <path d="M12.2025 22.2642C14.9707 22.2642 17.3052 21.3553 19.0061 19.7864L15.6986 17.2218C14.7784 17.8479 13.5904 18.2024 12.2063 18.2024C9.52863 18.2024 7.25825 16.3959 6.44363 13.9671H3.03052V16.6109C4.7729 20.0768 8.32178 22.2642 12.2025 22.2642V22.2642Z" fill="#34A853"></path>
                                <path d="M6.43988 13.9671C6.00994 12.6924 6.00994 11.3121 6.43988 10.0373V7.39359H3.03054C1.57478 10.2938 1.57478 13.7107 3.03054 16.6109L6.43988 13.9671V13.9671Z" fill="#FBBC04"></path>
                                <path d="M12.2025 5.79829C13.6658 5.77566 15.0801 6.32629 16.1399 7.33702L19.0703 4.40665C17.2147 2.66426 14.752 1.70633 12.2025 1.7365C8.32178 1.7365 4.7729 3.92391 3.03052 7.39359L6.43986 10.0373C7.25071 7.60479 9.52486 5.79829 12.2025 5.79829V5.79829Z" fill="#EA4335"></path>
                            </svg>
                        }
                        onClick={onClick}
                        disabled={disabled}
                    >
                        Google로 계속
                    </Button>
                )}
            />
            {/* <Button 
                variant="outlined" 
                fullWidth 
                startIcon={
                    <svg viewBox="0 0 24 24" width="22" height="22">
                        <path d="M22.4562 12C22.4562 6.22518 17.7748 1.54376 11.9999 1.54376C6.22512 1.54376 1.5437 6.22518 1.5437 12C1.5437 17.2189 5.36738 21.5448 10.3662 22.3292V15.0225H7.71125V12H10.3662V9.69637C10.3662 7.07577 11.9272 5.62823 14.3156 5.62823C15.4593 5.62823 16.6562 5.83246 16.6562 5.83246V8.40567H15.3378C14.0389 8.40567 13.6337 9.21174 13.6337 10.0395V12H16.5337L16.0701 15.0225H13.6337V22.3292C18.6325 21.5448 22.4562 17.2189 22.4562 12Z" fill="#1877F2"></path>
                        <path d="M16.0701 15.0225L16.5336 12H13.6337V10.0395C13.6337 9.21256 14.0388 8.40568 15.3377 8.40568H16.6562V5.83246C16.6562 5.83246 15.4596 5.62823 14.3156 5.62823C11.9272 5.62823 10.3661 7.07577 10.3661 9.69637V12H7.71118V15.0225H10.3661V22.3292C11.4487 22.4986 12.5511 22.4986 13.6337 22.3292V15.0225H16.0701Z" fill="white"></path>
                    </svg>
                }>
                Facebook로 계속
            </Button> */}
            </Stack>
        </>
    )
}

export default OAuthButtons;