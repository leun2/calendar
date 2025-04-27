import { signIn } from 'api/authApi';
import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { apiClient } from 'api/apiClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token.replace("Bearer ", ""));
        const now = Date.now() / 1000;
        return decoded.exp < now;
    } catch (e) {
        return true;
    }
}

function AuthProvider({ children }) {

    const token = localStorage.getItem("jwt");
    const valid = token && !isTokenExpired(token);
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : {};

    const [authState, setAuthState] = useState({
        isAuthenticated: valid,
        name: parsedUser.name || null,
        token,
        settings: {
            language: parsedUser.language || null,
            country: parsedUser.country || null,
            timezone: parsedUser.timezone || null
        }
    });

    async function login(email, password){

        try {
            const response = await signIn(email, password)

            if (response.status === 200) {

                const jwt = "Bearer " + response.data.token

                localStorage.setItem("jwt", jwt);
                localStorage.setItem("user", JSON.stringify({
                    name: response.data.name,
                    language: response.data.language,
                    country: response.data.country,
                    timezone: response.data.timezone
                }));
                
                setAuthState({ 
                    isAuthenticated: true, 
                    name: response.data.name, 
                    settings: {
                        language: response.data.language,
                        country: response.data.country,
                        timezone: response.data.timezone
                    },
                    token: jwt, 
                });

                return true; 
            } else {
                console.log('Please enter both username and password');
                return false; 
            }
            
        }catch (e) {
            console.log(e)
            return false
        }
    };

    async function loginWithGoogle(authCode) {
        try {
            console.log('🔑 Google Auth Code to send to backend:', authCode);
            console.log('🔍 Type of code:', typeof authCode);

            const response = await apiClient.post('/v1/auth/google/login', { code: authCode });

            if (response?.status === 200) {
                 console.log('Backend Google login successful:', response.data);

                 const jwt = "Bearer " + response.data.token;
                 localStorage.setItem("jwt", jwt);

                 const userData = {
                     name: response.data.name,
                     image: response.data.image,
                     language: response.data.settings?.language, 
                     country: response.data.settings?.country,
                     timezone: response.data.settings?.timezone
                 };
                 localStorage.setItem("user", JSON.stringify(userData));


                 setAuthState({
                     isAuthenticated: true,
                     name: userData.name,
                     token: jwt,
                     settings: {
                         language: userData.language,
                         country: userData.country,
                         timezone: userData.timezone
                     }
                 });
                 return true; // 로그인 성공
            } else {
                console.error('Google 로그인 실패 (백엔드 응답 오류):', response?.data?.message || '알 수 없는 오류');
                // TODO: 사용자에게 에러 알림
                return false; // 로그인 실패
            }
        } catch (error) {
            console.error('Google 로그인 요청 에러 (백엔드 통신 중 오류):', error);
             if (error.response) {
                 console.error('Backend response data:', error.response.data);
                 console.error('Backend response status:', error.response.status);
            }
            // TODO: 사용자에게 에러 알림
            return false; // 로그인 실패
        }
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        setAuthState({ isAuthenticated: false, email: null, name: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, loginWithGoogle, logout}}>
            {children}
        </AuthContext.Provider>
    );  
}

export { AuthContext, AuthProvider };