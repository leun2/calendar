import Main from "pages/Main";
import Settings from "pages/Settings";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Error from 'pages/Error';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { setupInterceptors } from "api/setupInterceptors";
import { AuthProvider } from 'components/auth/AuthContext';
import AuthenticatedRoute from 'components/auth/AuthenticatedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';

setupInterceptors();

function App() {

  return (
    <div className='app'>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route 
                        path="/" 
                        element={<Navigate replace to="/day" />} />

                    <Route 
                        path="/:viewType" 
                        element={
                            <AuthenticatedRoute>
                                <Main />
                            </AuthenticatedRoute>} />
                        
                    <Route path="/:viewType/:year/:month/:day" 
                        element={
                            <AuthenticatedRoute>
                                <Main />
                            </AuthenticatedRoute>} />

                    <Route 
                        path="/settings" 
                        element={
                            <AuthenticatedRoute>
                                <Settings />
                            </AuthenticatedRoute>}/>

                    <Route path="/signin" element={<SignIn />} />

                    <Route path="/signup" element={<SignUp />} />

                    <Route path='*' element={<Error />} />
                </Routes>
            </Router>
        </AuthProvider>
    </GoogleOAuthProvider>
    </div>
  );
}

export default App;
