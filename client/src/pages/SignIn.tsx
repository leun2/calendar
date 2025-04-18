import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import SignInEmailForm from 'components/auth/SignInEmailForm'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignInForm from 'components/auth/SignInForm';
import ImagePanel from 'components/auth/ImagePanel';
import { ping } from 'api/apiClient';

function SignIn() {

    const [isEmailVaild, setSignUpState] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchPing = async () => {
          try {
            const response = await ping();
            console.log(response.data);
          } catch (error: any) {
            console.log(error.message || '핑 요청 실패');
          }
        };
    
        fetchPing();
      }, []); 

    return (
        <div style={{display:"flex"}}>
            <CssBaseline />
            <ImagePanel />
            {
                isEmailVaild 
                    
                    ? <SignInForm 
                        email={email}
                        onPrev={() => setSignUpState(false)} />
                    : <SignInEmailForm 
                        onNext={
                            (enteredEmail : string) => {
                                setEmail(enteredEmail);
                                setSignUpState(true);
                            }
                        } /> 
            }
        </div>
    );
}

export default SignIn;
