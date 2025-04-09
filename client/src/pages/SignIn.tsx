import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import SignInEmailForm from 'components/auth/SignInEmailForm'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignInForm from 'components/auth/SignInForm';

function SignIn() {

    const [isEmailVaild, setSignUpState] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <div>
            <CssBaseline />
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
