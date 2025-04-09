import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import SignUpEmailForm from 'components/auth/SignUpEmailForm'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignUpForm from 'components/auth/SignUpForm';

function SignUp() {

    const [isEmailVaild, setSignUpState] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <div>
            <CssBaseline />
            {
                isEmailVaild 
                    
                    ? <SignUpForm 
                        email={email}
                        onPrev={() => setSignUpState(false)} />
                    : <SignUpEmailForm 
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

export default SignUp;
