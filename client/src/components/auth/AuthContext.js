import { signIn } from 'api/authApi';
import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 

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

    const logout = () => {
        localStorage.removeItem("jwt");
        setAuthState({ isAuthenticated: false, email: null, name: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout}}>
            {children}
        </AuthContext.Provider>
    );  
}

export { AuthContext, AuthProvider };